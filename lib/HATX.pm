# lib/HATX.pm v0.0.2-2
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

package HATX;
use Mojo::Base -base;
use Mojo::Util qw/dumper/;
use Mojo::JSON qw/encode_json decode_json/;
use Exporter 'import';
use Carp;

our @EXPORT_OK = qw(hatx);

my $D = 0;

sub clone {
    decode_json(encode_json(shift));
}

sub new {
    my $class = shift;
    my $self = {H => undef, A => undef};
    bless $self, $class;
    return $self;
}

sub from_obj {
    my ($o,$obj) = @_;

    $o->{H} = clone($obj) if ref($obj) eq 'HASH';
    $o->{A} = clone($obj) if ref($obj) eq 'ARRAY';

    return $o;
}

sub from {
    my $class = shift;
    my $obj = shift;
    my $self = {H => undef, A => undef};
    bless $self, $class;
    return $self->from_obj($obj);
}

sub hatx {
    return from('HATX',@_);
}

sub to_obj {
    my $o = shift;
    return clone($o->{H}) if defined $o->{H};
    return clone($o->{A}) if defined $o->{A};
}

sub to_json {
    my $o = shift;
    return encode_json($o->to_obj);
}

sub subrows_to_hash {
    my ($o,$keys) = @_;
    my $new_A = [];

    foreach my $row (@{$o->{A}}) {
        my $res = {};
        map { $res->{$_} = shift @$row } @$keys;
        push @$new_A, $res;
    }
    $o->{A} = $new_A;
    return $o;
}

sub subrows_to_aref {
    my $o = shift;
    my $new_A = [];

    foreach my $row (@{$o->{A}}) {
        push @$new_A, [$row];
    }
    $o->{A} = $new_A;
    return $o;
}

sub aref_to_href {
    my ($o,$opt) = @_;
    my $key = $opt->{withkey};
    my $href = {};
    foreach my $row (@{$o->{A}}) {
        $href->{$row->{$key}} = $row;
    }
    $o->{H} = $href;
    $o->{A} = undef;
    return $o;
}

sub to_href_by_pos {
    ## Convert aref to href by specifying index of field to use as hash key
    my ($o,$opt) = @_;
    my $pos = $opt->{withpos};
    my $href = {};
    foreach my $row (@{$o->{A}}) {
        $href->{$row->[$pos]} = $row;
    }
    $o->{H} = $href;
    $o->{A} = undef;
    return $o;
}

sub filter {
    my $o = shift;
    my $fn = shift;     # H: fn->($key,$val)
                        # A: fn->($val)

    if (defined($o->{H})) {
        foreach my $k (keys %{$o->{H}}) {
            delete $o->{H}{$k} unless $fn->($k,$o->{H}{$k});
        }
    }
    if (defined($o->{A})) {
        my $new_A = [];
        foreach my $v (@{$o->{A}}) {
            push @$new_A, $v if $fn->($v);
        }
        $o->{A} = $new_A;
    }
    return $o;
}
sub filter_if {
    # Run the filter if $do_filter is true
    my $o = shift;
    my $do_filter = shift;
    my $fn = shift;     # H: fn->($key,$val)
                        # A: fn->($val)

    return $do_filter ? $o->filter($fn) : $o;
}

=head2 maap

Applies the function $fn to all elements.

    $fn
        - For hashref,  function signature should be ($key,$val) -> ($key,$val)
        - For arrayref, function signature should be ($val)      -> ($val)

Example: Square all elements in arrayref:

    hatx([1,2,3])->maap(sub { $_[0] * $_[0]})->to_obj
    # Returns [1,4,9]

Example: Square all values in hashref

    hatx({a=>1,b=>2,c=>3})->maap(sub { $_[0], $_[1]*$_[1] })->to_obj
    # Returns { a => 1, b => 4,c => 9 }

=cut
sub maap {
    my $o = shift;
    my $fn = shift;     # H: fn->($key,$val)
                        # A: fn->($val)

    if (defined($o->{H})) {
        my $new_H = {};
        foreach my $k (keys %{$o->{H}}) {
            my ($k2,$v2) = $fn->($k,$o->{H}{$k});
            $new_H->{$k2} = $v2;
        }
        $o->{H} = $new_H;
    }
    if (defined($o->{A})) {
        my $new_A = [];
        foreach my $v (@{$o->{A}}) {
            push @$new_A, $fn->($v);
        }
        $o->{A} = $new_A;
    }
    return $o;
}

=head2 to_href

Assumes current struct is an arrayref. Converts arrayref to a hashref
using provided function, $fn

    $fn - Function takes a single variable and returns a key, val

Example:

    hatx(['H','A','T','X'])
        ->to_href(sub { $_[0], ord($_[0]) })
        ->to_obj;
    # Returns { H => 72, A => 65, T => 84, X => 88}

=cut
sub to_href {
    my ($o,$fn) = @_;
    $o->maap($fn);
    carp 'HATX/to_href: Not an array' unless ref($o->{A}) eq 'ARRAY';
    $o->{H} = {@{$o->{A}}};
    $o->{A} = undef;
    return $o;
}

=head2 to_aref

Assumes current struct is a hashref. Converts hashref to an arrayref
using provided function, $fn

    $fn2 - Function takes a two variables and returns a single value

=cut
sub to_aref {
    my ($o,$fn2) = @_;
    $fn2 = defined $fn2 ? $fn2 : sub {$_[1]};
    my $new_A = [];

    foreach my $k (keys %{$o->{H}}) {
        push @$new_A, $fn2->($k,$o->{H}{$k});
    }
    $o->{A} = [sort @$new_A];
    $o->{H} = undef;
    return $o;

    my $new_fn2 = sub {
        my $v = $fn2->(@_);
        return ($v,$v)
    };
    my $obj = $o->maap($new_fn2)->to_obj;

    $o->{A} = [sort values %{$obj}];

    $o->{H} = undef;
    return $o;
}

=head2 morph( SELF, TARGET_OBJECT ) -> TARGET_OBJECT

    SELF            [0]
        The calling object.

    TARGET_OBJECT   [1]
        An object in the target class. It must have method from_obj().

=cut
sub morph {
    $_[1]->from_obj($_[0]->to_obj)
}

sub count {
    my $o = shift;
    return scalar @{$o->{A}} if defined $o->{A};
    return scalar keys %{$o->{H}} if defined $o->{H};
    return 0;
}

sub group_by {
    my $o = shift;
    my $fn = shift;

    my $new_H = {};
    if (defined($o->{H})) {
        foreach my $k (keys %{$o->{H}}) {
            my ($k2,$v2) = $fn->($k,$o->{H}{$k});
            $new_H->{$k2} = [] unless exists($new_H->{$k2});
            push @{$new_H->{$k2}}, $v2;
        }
    }
    if (defined($o->{A})) {
        foreach my $v (@{$o->{A}}) {
            my ($k2,$v2) = $fn->($v);
            $new_H->{$k2} = [] unless exists($new_H->{$k2});
            push @{$new_H->{$k2}}, $v2;
        }
    }
    $o->{H} = $new_H;
    $o->{A} = undef;
    return $o;
}

sub apply {
    my $o = shift;
    my $fn = shift;

    $o->{H} = $fn->($o->to_obj) if defined($o->{H});
    $o->{A} = $fn->($o->to_obj) if defined($o->{A});
    return $o;
}

sub eeach {
    my $o = shift;
    my $fn = shift;
    my $res;

    if (defined($o->{H})) {
        $res = {};
        foreach my $k (keys %{$o->{H}}) {
            $res->{$k} = $fn->($k,$o->{H}{$k});
        }
        $o->{H} = $res;
    }
    if (defined($o->{A})) {
        $res = [ map { $fn->{$_} } @{$o->{A}} ];
        $o->{A} = $res;
    }
    return $o;
}

=head2 info( $prefix )

Display struct content with some prefix.

Example:

    hatx([2,3,5,7])->info('Primes');

    # Prints
    Primes: [
      2,
      3,
      5,
      7
    ]

=cut
sub info {
    my $o = shift;
    my $phrase = shift || 'info';
    say "$phrase: " . dumper($o->to_obj);
    return $o;
}

sub end {
    my $o = shift;
    $o->info(shift);
    exit;
}

sub sort_by {
    my $o = shift;
    my $key = shift;

    carp('HATX/sort_by: Not an ARRAY object.')
        && return $o unless defined $o->{A};

    my $new_A = [];
    HATX->from($o->{A})
        ->group_by(sub { $_[0]->{$key},$_[0] })
        #->info('sort_by/1')
        ->apply(sub {
                my @sorted = join('',keys %{$_[0]}) =~ /^(\d|\s)+$/
                           ? sort {$a<=>$b} keys %{$_[0]}
                           : sort keys %{$_[0]};

                foreach (@sorted) {
                    push @$new_A, @{$_[0]->{$_}};
                }
            })
        ;
    $o->{A} = $new_A;

    return $o;
}

1;
