# lib/SqlHelper.pm v0.0.2-1
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

package SqlHelper;

use strict; use warnings; use utf8; use 5.10.0;
use Try::Tiny;
use Data::Dumper;
use Carp;
use Mojo::Log;

use lib ("lib", "../lib");

use Exporter;
use vars qw(@ISA @EXPORT @EXPORT_OK %EXPORT_TAGS);

@ISA         = qw(Exporter);
@EXPORT      = ();
@EXPORT_OK   = qw/run_sql/;
%EXPORT_TAGS = ( all => [@EXPORT_OK] );

## GLOBALS
my $log = Mojo::Log->new(path => 'log/SqlHelper_pm.log', level => 'debug');

sub run_sql {
    my ($dbh, $sql, @params) = @_;
    my $resp = {};
    my ($err_msg, $err_str, $mess);

    # Try SQL prepare
    my $sth;
    try { $sth = $dbh->prepare($sql) } catch {};
    unless (defined($sth)) {

        ## Log the SQL Prepare error
        $mess = Carp::longmess();
        $err_str = $dbh->errstr;
        $err_msg = <<END;
SQL Prepare failed
  dbh   : $dbh
  SQL   : $sql
  Params: Data::Dumper([@params])

  Error : $err_str

$mess
END
        $log->error($err_msg);

        ## Return error response
        return {  status => 'nok',
                  errmsg => "Prepare SQL Error: " 
                          . $dbh->errstr . " | SQL: $sql"};
    }

    # Try SQL execution
    try { $sth->execute(@params) } catch {};
    if ($sth->err) {
        ## Log the SQL Exec error
        $mess = Carp::longmess();
        $err_str = $sth->errstr;
        $err_msg = <<END;
SQL Exec failed
  dbh   : $dbh
  SQL   : $sql
  Params: Data::Dumper([@params])

  Error : $err_str

$mess
END
        $log->error($err_msg);

        ## Return error response
        return  { status => 'nok',
                  errmsg => "Execute SQL Error: " . $sth->errstr };
    }

    # Return normal content
    my $sqlres = $sth->fetchall_arrayref();
    $sth->finish;
    return { status => 'ok',
             data   => $sqlres };
}

1;
