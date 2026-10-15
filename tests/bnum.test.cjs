const test = require("node:test");
const assert = require("node:assert/strict");
const Bnum = require("../bnum.js");
test("scientific parsing works above floating-point numeric limits", () => {
  assert.equal(Bnum.fromString("1e3000").toString(), "1e3000");
  assert.equal(Bnum.fromString("-5.2e4000").toString(), "-5.2e4000");
  assert.equal(Bnum.format("1e3000"), "1e3K");
  assert.equal(Bnum.fromString("0.002").toNumber(), 0.002);
  assert.equal(Bnum.fromString("1.5").toNumber(), 1.5);
});
test("zero and arithmetic behave sensibly", () => {
  assert.equal(Bnum.add("1e3000","1e2").toString(), "1e3000");
  assert.equal(Bnum.sub("25","25").toString(), "0e0");
  assert.equal(Bnum.mul("1.5e10","2").toNumber(), 3e10);
  assert.equal(Bnum.div("10","2").toNumber(), 5);
  assert.ok(Math.abs(Bnum.pow("2","10").toNumber()-1024)<1e-8);
  assert.equal(Bnum.pow("-2","3").toNumber(), -8);
  assert.equal(Bnum.log("1000","10").toNumber(), 3);
});
test("bad arithmetic and invalid inputs are rejected", () => {
  for (const v of ["abc","1e","1foo","1e999999999999999999"]) assert.throws(()=>Bnum.fromString(v));
  assert.throws(()=>Bnum.div("1","0"),/zero/);
  assert.throws(()=>Bnum.log("100","1"),/base/i);
  assert.throws(()=>Bnum.log("-1","10"),/positive/i);
  assert.throws(()=>Bnum.pow("-2","0.5"),/integer/);
  assert.throws(()=>Bnum.pow("0","-1"),/Zero/);
});
