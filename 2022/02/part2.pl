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
	my ($elf, $result) = @_;

	# Default to draw op
	my $op = 0;
	my $score = 0;

	if ($result == 1) {
		# LOSS
		$op = -1;
	} elsif ($result == 2) {
		# DRAW
		$score = $draw;
	} else {
		# WIN
		$score = $win;
		$op = 1;
	}

	$mine = ($elf + $op);

	# Sketchy wrap around logic
	$mine = 3 if $mine == 0;
	$mine = 1 if $mine == 4;

	return $score + $mine;
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
