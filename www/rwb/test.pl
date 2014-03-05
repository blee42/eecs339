#!/usr/bin/perl -w

use CGI;
use Crypt::OpenSSL::Bignum;
use Crypt::OpenSSL::Random;
use Crypt::OpenSSL::RSA;

my $pass = "hello";
my $rsa = Crypt::OpenSSL::RSA->generate_key(2048);
my ($n, $e, $d, $p, $q) = $rsa->get_key_parameters();

my @m;
for (my $i=0; $i<length($pass); $i++) {
    my $char = substr $pass, $i, 1;
    my $a = ord($char);
    push(@m, $a);
}

print $rsa->encrypt($pass);
print "\n";
print $pass;
