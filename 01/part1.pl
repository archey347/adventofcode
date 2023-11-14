#!/usr/bin/en perl

use strict;
use warnings;

my $max = 0;
my $tmp = 0;

while(<STDIN>) {
    my $line = $_;
    chomp $line;

    if($line eq "") {
        $max = max $max, $tmp;
        $tmp = 0;
    } else {
        $tmp += $line;
    } 
}

print "$max;";