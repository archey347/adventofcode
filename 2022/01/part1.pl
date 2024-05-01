#!/usr/bin/env perl

use strict;
use warnings;

my $max = 0;
my $tmp = 0;

while(<STDIN>) {
    my $line = $_;
    chomp $line;

    if($line eq "") {
        $max = $tmp if $tmp > $max;
        $tmp = 0;
    } else {
        $tmp += $line;
    } 
}

print "$max";
