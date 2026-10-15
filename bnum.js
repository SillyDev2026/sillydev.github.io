"use strict";
/* Decimal-scientific numbers; exponent is a safe JS integer, not an unlimited tetration layer. */
class Bnum {
  constructor(man, exp = 0) {
    if (!Number.isFinite(man) || !Number.isSafeInteger(exp)) throw new RangeError("Invalid Bnum mantissa or exponent");
    if (man === 0) { this.man = 0; this.exp = 0; return; }
    let shift = Math.floor(Math.log10(Math.abs(man)));
    let scaled = man / 10 ** shift;
    if (Math.abs(scaled) >= 10) { scaled /= 10; shift++; }
    if (Math.abs(scaled) < 1) { scaled *= 10; shift--; }
    const nextExp = exp + shift;
    if (!Number.isSafeInteger(nextExp)) throw new RangeError("Exponent exceeds JavaScript safe integer range");
    this.man = scaled;
    this.exp = nextExp;
  }
  static convert(v) { if (v instanceof Bnum) return v; return Bnum.fromString(v); }
  static fromNumber(n) { if (!Number.isFinite(n)) throw new RangeError("Enter a finite number"); return new Bnum(n); }
  static fromString(value) {
    const input = String(value).trim();
    if (input.length > 12000) throw new RangeError("Number is too long");
    const match = /^([+-]?)(\d+(?:\.\d*)?|\.\d+)(?:e([+-]?\d+))?$/i.exec(input);
    if (!match) throw new SyntaxError("Use a number such as 15, -2.5, or 1.2e3000");
    const coeff = match[2], point = coeff.indexOf(".");
    const digits = coeff.replace(".", ""), first = digits.search(/[1-9]/);
    if (first === -1) return new Bnum(0);
    const fraction = digits.slice(first, first + 16);
    const mantissa = Number(fraction[0] + (fraction.length > 1 ? "." + fraction.slice(1) : ""));
    const expPart = match[3] ? Number(match[3]) : 0;
    const decimalPoint = point === -1 ? coeff.length : point;
    const exponent = expPart + decimalPoint - first - 1;
    if (!Number.isSafeInteger(exponent)) throw new RangeError("Exponent is outside the supported range");
    return new Bnum((match[1] === "-" ? -1 : 1) * mantissa, exponent);
  }
  static add(a,b) {
    a=Bnum.convert(a);b=Bnum.convert(b);
    if (!a.man) return b; if (!b.man) return a;
    if (a.exp < b.exp) [a,b] = [b,a];
    const diff = a.exp - b.exp;
    if (diff > 18) return a;
    return new Bnum(a.man + b.man * 10 ** -diff, a.exp);
  }
  static sub(a,b) { b=Bnum.convert(b); return Bnum.add(a,new Bnum(-b.man,b.exp)); }
  static mul(a,b) { a=Bnum.convert(a);b=Bnum.convert(b); return !a.man || !b.man ? new Bnum(0) : new Bnum(a.man*b.man,a.exp+b.exp); }
  static div(a,b) { a=Bnum.convert(a);b=Bnum.convert(b); if (!b.man) throw new RangeError("Division by zero"); return new Bnum(a.man/b.man,a.exp-b.exp); }
  static log10(v) { v=Bnum.convert(v); if (v.man<=0) throw new RangeError("Logarithm requires a positive number"); return Bnum.fromNumber(Math.log10(v.man)+v.exp); }
  static log(a,b) { const base=Bnum.convert(b); if (base.man<=0 || (base.man===1 && base.exp===0)) throw new RangeError("Log base must be positive and not equal to 1"); return Bnum.div(Bnum.log10(a),Bnum.log10(base)); }
  toNumber() { if (!this.man) return 0; if(this.exp>308) return this.man<0?-Infinity:Infinity; if (this.exp < -324) return 0; return this.man*10**this.exp; }
  static pow(a,b) {
    a=Bnum.convert(a);b=Bnum.convert(b);
    const power=b.toNumber();
    if (!Number.isFinite(power) || Math.abs(power)>1e8) throw new RangeError("Power is too large to calculate reliably");
    if (!a.man) { if (power<=0) throw new RangeError("Zero cannot be raised to a nonpositive power"); return new Bnum(0); }
    if (a.man<0 && !Number.isInteger(power)) throw new RangeError("Negative bases require an integer exponent");
    const log = (Math.log10(Math.abs(a.man))+a.exp)*power;
    if (!Number.isFinite(log) || !Number.isSafeInteger(Math.floor(log))) throw new RangeError("Power exceeds supported exponent range");
    const exp = Math.floor(log);
    const sign = a.man<0 && Math.abs(power % 2)===1 ? -1:1;
    return new Bnum(sign*10**(log-exp),exp);
  }
  static format(v) {
    v=Bnum.convert(v);
    if(!v.man) return "0";
    const sign=v.man<0?"-":"", m=Math.abs(v.man), exp=v.exp;
    const trim=(n)=>n.toFixed(3).replace(/\.?0+$/,"");
    if(exp>=-3&&exp<3) return sign+Number((m*10**exp).toPrecision(7)).toString();
    const suffix=["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No"];
    const tier=Math.floor(exp/3);
    if(exp>=3 && tier<suffix.length) return sign+trim(m*10**(exp%3))+suffix[tier];
    const e=exp>=3000 ? Bnum.shortExponent(exp) : String(exp);
    return sign+trim(m)+"e"+e;
  }
  static shortExponent(exp) {
    const units=["","K","M","B","T"];
    let tier=0,val=exp;
    while(val>=1000 && tier<units.length-1) {val/=1000;tier++;}
    return Number(val.toPrecision(4)).toString()+units[tier];
  }
  toString() {return this.man+"e"+this.exp;}
}
if (typeof module !== "undefined" && module.exports) module.exports=Bnum;
if (typeof window !== "undefined") window.Bnum=Bnum;
