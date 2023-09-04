# Main.pl v0.0.2-2
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

=head1 Main.pl

Main Clinic Program

=cut

BEGIN {
    $ENV{MOJO_INACTIVITY_TIMEOUT} = 120;
}

use Mojolicious::Lite;
use Mojo::JSON qw(decode_json encode_json);
use DBI;
use Data::Dumper;
use Path::Tiny qw/path/;

use lib ("lib", "../lib");
use SqlHelper qw/run_sql/;
use HATX qw/hatx/;

# Web service parameters (SP)
my $SP = {
    name => 'Main.pl',
    ver  => '0.0.1-1',        # $VERSION
    env  => `hostname` eq 'i5' ? 'DEV' : 'PROD',
};

# Global parameters
my $PEEK_LEVEL = 2; ## Disallow peeks below this level
my $dbpatient = DBI->connect("dbi:SQLite:dbname=private/Patient.db","","",{sqlite_unicode=>1});
my $PATIENT = {
    # Full set of fields
    fullColumns => [qw/hn firstName lastName dob gender disease allergy
        bloodGroup phoneNum race nationality idcard addrNum addrMoo
        addrStreet addrTambon addrAmphur addrProvince addrPostcode
        contactName contactRelation contactPhoneNum/],

    # Sequence of fields in the patient data.
    # This sequence should be the same sequence as that in the frontend
    # else there will be problems.
     partialColumns => [qw/hn firstName lastName dob gender disease allergy
        bloodGroup/],
};

sub peek {      # ( $level, $res ) --> $res
    ## If $level is at least PEEK_LEVEL, print content of $res
    my ($level, $res) = @_;
    return $res if $level < $PEEK_LEVEL;

    my $file = (caller(0))[1];
    my $line = (caller(0))[2];
    say "$file line $line: ". Dumper $res;
    return $res;
}

######################################################################
# API Endpoints
######################################################################

get '/' => sub { shift->redirect_to('/index.html') };

get '/patients' => sub {
    my $c = shift;

    # Fetch data
    my $data = peek 0, run_sql( $dbpatient,
        "SELECT ". join(', ', @{$PATIENT->{partialColumns}}) ." FROM Patient"
    )->{data};

    # $c->res->headers->header("Access-Control-Allow-Origin" => "*");
    return $c->render(json => [
        'ok',
        $data || [],
    ]);
};

post '/patients' => sub {
    my $c = shift;
    my $data = peek 0, decode_json($c->req->body);

    # Initialize response data
    my $res = $data;                            # Response container
    my $errors = [];                            # Error container
    my $sqlres;

    # Guard: Required fields should not be null/empty
    # TODO: Assume required fields are neither null or empty

    # Guard: Date fields should be valid
    # TODO: Assume dates are valid

    # Guard: firstName + lastName + gender + dob should be unique
    my $num_recs = peek 0, run_sql( $dbpatient,
        'SELECT count(*) FROM Patient WHERE '
        . 'firstName == ? AND lastName == ? AND gender == ? AND dob == ?',
        $data->{patient}{firstName},
        $data->{patient}{lastName},
        $data->{patient}{gender},
        $data->{patient}{dob}
    )->{data}[0][0];

    if ($num_recs > 0) {
        push @$errors, 'Record with name, gender and dob already exist';
        goto EXIT_NOK;
    }

    # Do action: Add record

    # List of fields excluding the first field "hn"
    my $fields = $PATIENT->{fullColumns};

    # Get next HN and update data object
    # Minimum value of HN is 1000
    $data->{patient}{hn} = peek 0, run_sql( $dbpatient,
        'SELECT COALESCE(Max(hn),1000)+1 FROM PATIENT')->{data}[0][0];

    # Create placeholders from fields
    my $placeholders = peek 0, '?,' x $#$fields . '?';

    # Create values from fields
    my $values = peek 0, hatx($fields)
        ->maap(sub { $data->{patient}{$_[0]} })
        #->info
        ->to_obj;

    $sqlres = peek 0, run_sql( $dbpatient,
        "INSERT INTO Patient VALUES($placeholders)",
        @$values);

    # Check for errors
    if ($sqlres->{status} eq 'nok') {
        push @$errors, 'Server error. Please inform administrator';
        goto EXIT_NOK;
    }

    # Send nok response on error
    EXIT_NOK:
    return $c->render(json => peek 0, [
        'nok',
        $res,
        $errors
    ]) if $#$errors > -1;

    # Send ok response
    EXIT_OK:
    return $c->render(json => peek 0, [
        'ok',
        $res,
    ]);

};

######################################################################
# Helpers
######################################################################

sub before_start {
    my ($app, $sp) = @_;

    # App string - Name, Version and Environment
    my $app_str = sprintf("%s v%s (%s:%s)",
                          $sp->{name}, $sp->{ver}, $sp->{env}, $$);
    # Print App string
    print "\n$app_str\n";
    $app->secrets($app_str);
    path('log/.tmp')->touchpath;                # Ensure that log path exists
    $app->log->path('log/'.$sp->{name}.'.log');
    $app->log->info($app_str);
    path('log/.tmp')->remove;

    # See: https://groups.google.com/forum/#!msg/mojolicious/_HLsJeheavE/tyfQ05YsbPAJ
    $app->hook(after_dispatch => sub {
        my $c = shift;
        # Spoof server header
        $c->res->headers->header('Server' => 'nginx/1.4.1');
        $c->res->headers->header('Access-Control-Allow-Origin' => '*');
    });
}

before_start(app, $SP);
app->start;

