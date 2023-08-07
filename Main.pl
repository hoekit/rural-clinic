# Main.pl
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

