"use strict";
document.addEventListener("DOMContentLoaded",()=>{
  const setup=document.getElementById("setupCode");
  const body=document.getElementById("benchmarkBody");
  const iterations=document.getElementById("iterations");
  const generated=document.getElementById("generated");
  const message=document.getElementById("benchMessage");
  document.getElementById("generateBtn").addEventListener("click",()=>{
    const count=Number(iterations.value);
    if(!Number.isInteger(count)||count<100||count>10000000){
      message.textContent="Iterations must be a whole number between 100 and 10,000,000.";
      iterations.focus();return;
    }
    if(!body.value.trim()) {message.textContent="Add a benchmark expression first.";body.focus();return;}
    message.textContent="Generated. Copy this script into Roblox Studio to measure actual Luau performance.";
    generated.textContent=`--!optimize 2
-- Run in Roblox Studio (not a browser).
${setup.value.trim()}

local iterations = ${count}
local function runSample()
${body.value.split("\n").map(line=>"    "+line).join("\n")}
end

-- Warm up JIT / native paths before measuring.
for i = 1, math.min(iterations, 2000) do
    runSample()
end

local start = os.clock()
for i = 1, iterations do
    runSample()
end
local elapsed = os.clock() - start
print(string.format("Total: %.6fs | Mean: %.3f ns/op | N: %d",
    elapsed, elapsed * 1e9 / iterations, iterations))`;
  });
  document.getElementById("generateBtn").click();
});
