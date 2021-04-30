# cidrCalc

cidrCalc is a Web-based CIDR (Classless InterDomain Routing) calculator. It, when given an IP address range in CIDR notation, will print the range and relevant bitmasks.

## Features
- All done in client-side JavaScript without additional libraries and frameworks
- Given an IP address range in CIDR notation, it will calculate:
   - The CIDR subnet prefix
   - The wildcard mask (what bits influence the range?)
   - The subnet mask (what bits are not in the range?)
   - The starting and ending IP addresses

## Known Bugs and Pitfalls
- Only supports IPv4 in the standard `a.b.c.d/x` format.
   - While `a.d/x` is a valid format, this tool will not properly resolve it as `a.0.0.d/x`.
- The code and UI could be prettier/more optimised.

## Demo

The canonical instance can be found at [cidr.divi.sh](https://cidr.divi.sh/).
