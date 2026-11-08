#!/usr/bin/env perl

my $scores = {
	"A" => 1,
	"X" => 1,
	"B" => 2,
	"Y" => 2,
	"C" => 3,
	"Z" => 3,
};

sub lt_s {
	my ($letter) = @_;

	return $scores->{$letter} // die "bad letter '$letter'";
}

my $lost = 0;
my $draw = 3;
my $win  = 6;


sub round {
	my ($elf, $mine) = @_;

	my $x = $elf - $mine;

	return $mine + $draw
		if $x == 0;

	$mod = $x % 2 == 0;
	$neg = $x < 0;

	return $mine + $win
		if $neg != $mod;
	
	return $mine + $lost;
}

my $sum = 0;
while (<STDIN>) {
	my $line = $_;
	chomp $line;

	my ($elf, $mine) = $line =~ /(A|B|C) (X|Y|Z)/;
	($elf, $mine) = (lt_s($elf), lt_s($mine)); 

	$sum += round($elf, $mine);
}

print ($sum, "\n");
