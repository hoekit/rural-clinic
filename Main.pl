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
use Path::Tiny qw/path/;

# Web service parameters (SP)
my $SP = {
    name => 'Main.pl',
    ver  => '0.0.0-1',        # $VERSION
    env  => `hostname` eq 'i5' ? 'DEV' : 'PROD',
};

######################################################################
# API Endpoints
######################################################################

get '/' => sub { shift->redirect_to('/index.html') };

get '/patients' => sub {
    my $c = shift;

    # Sequence of fields in the patient data.
    # This sequence should be the same sequence as that in the frontend
    # else there will be problems.
    my $fields = [qw/hn firstName lastName dob gender disease allergy
        bloodGroup/];

    my $mock_1001 = [
        1001,                   # hn
        "First Name 1001",      # firstName
        "Last Name 1001",       # lastName
        "2000-01-01",           # dob
        "ชาย",                  # gender
        "-",                    # disease
        "-",                    # allergy
        undef,                  # bloodGroup
    ];

    my $mock_1002 = [
        1002,                   # hn
        "First Name 1002",      # firstName
        "Last Name 1002",       # lastName
        "2000-01-01",           # dob
        "หญิง",                  # gender
        "-",                    # disease
        "-",                    # allergy
        undef,                  # bloodGroup
    ];

    my $data = [ $mock_1001, $mock_1002 ];

    $c->res->headers->header("Access-Control-Allow-Origin" => "*");
    return $c->render(json => [
        'ok',
        $data || [],
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

