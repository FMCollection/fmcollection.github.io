function getUnit(){
  const active = document.querySelector('.unit-btn.active');
  return active ? active.dataset.unit : 'metric';
}
function getHeightCm(prefix){
  if(getUnit() === 'metric'){
    return parseFloat(document.getElementById(prefix+'-height-cm')?.value) || parseFloat(document.getElementById(prefix+'-height')?.value) || 0;
  }
  const ft = parseFloat(document.getElementById(prefix+'-height-ft')?.value) || 0;
  const inch = parseFloat(document.getElementById(prefix+'-height-in')?.value) || 0;
  return (ft*12 + inch) * 2.54;
}
function getWeightKg(prefix){
  if(getUnit() === 'metric'){
    return parseFloat(document.getElementById(prefix+'-weight-kg')?.value) || parseFloat(document.getElementById(prefix+'-weight')?.value) || parseFloat(document.getElementById(prefix+'-wt')?.value) || 0;
  }
  const lb = parseFloat(document.getElementById(prefix+'-weight-lb')?.value) || 0;
  return lb * 0.453592;
}
function fmtWeight(kg){
  return getUnit() === 'metric' ? kg.toFixed(1)+' kg' : (kg/0.453592).toFixed(1)+' lb';
}

function calcBMI(){
  const h = getHeightCm('bmi')/100;
  const w = getWeightKg('bmi');
  if(!h || !w){ alert('Please enter your height and weight.'); return; }
  const bmi = w/(h*h);
  let cat, color;
  if(bmi < 18.5){ cat='Underweight'; color='var(--blue)'; }
  else if(bmi < 25){ cat='Normal weight'; color='var(--vital)'; }
  else if(bmi < 30){ cat='Overweight'; color='var(--amber)'; }
  else { cat='Obese'; color='var(--pulse-dark)'; }
  const pct = Math.min(100, Math.max(0, ((bmi-15)/(40-15))*100));
  document.getElementById('bmi-result').style.display = 'block';
  document.getElementById('bmi-value').textContent = bmi.toFixed(1);
  const badge = document.getElementById('bmi-cat');
  badge.textContent = cat;
  badge.style.background = color;
  document.getElementById('bmi-marker').style.left = pct + '%';
}

function calcCalories(){
  const age = parseFloat(document.getElementById('cal-age').value);
  const gender = document.getElementById('cal-gender').value;
  const h = getHeightCm('cal');
  const w = getWeightKg('cal');
  const activity = parseFloat(document.getElementById('cal-activity').value);
  if(!age || !h || !w){ alert('Please fill in age, height, and weight.'); return; }
  let bmr = 10*w + 6.25*h - 5*age;
  bmr += (gender === 'male') ? 5 : -161;
  const tdee = bmr * activity;
  document.getElementById('cal-result').style.display = 'block';
  document.getElementById('cal-bmr').textContent = Math.round(bmr) + ' kcal';
  document.getElementById('cal-tdee').textContent = Math.round(tdee) + ' kcal';
  document.getElementById('cal-mildloss').textContent = Math.round(tdee-250) + ' kcal';
  document.getElementById('cal-loss').textContent = Math.round(tdee-500) + ' kcal';
  document.getElementById('cal-gain').textContent = Math.round(tdee+300) + ' kcal';
}

function calcBMR(){
  const age = parseFloat(document.getElementById('bmr-age').value) || 25;
  const gender = document.getElementById('bmr-gender').value;
  const h = parseFloat(document.getElementById('bmr-height-cm').value) || 170;
  const w = parseFloat(document.getElementById('bmr-weight-kg').value) || 65;
  let bmr = 10*w + 6.25*h - 5*age + (gender === 'male' ? 5 : -161);
  document.getElementById('bmr-result').style.display = 'block';
  document.getElementById('bmr-value').textContent = Math.round(bmr) + ' kcal';
}

function calcBodyFat(){
  const gender = document.getElementById('bf-gender').value;
  const hcm = getHeightCm('bf');
  const neck = parseFloat(document.getElementById('bf-neck-cm').value);
  const waist = parseFloat(document.getElementById('bf-waist-cm').value);
  let hip = gender === 'female' ? (parseFloat(document.getElementById('bf-hip-cm').value) || 0) : 0;
  if(!hcm || !neck || !waist || (gender==='female' && !hip)){ alert('Please fill in all measurements.'); return; }
  let bf;
  if(gender === 'male'){
    bf = 495/(1.0324 - 0.19077*Math.log10(waist-neck) + 0.15456*Math.log10(hcm)) - 450;
  } else {
    bf = 495/(1.29579 - 0.35004*Math.log10(waist+hip-neck) + 0.22100*Math.log10(hcm)) - 450;
  }
  bf = Math.max(2, Math.min(60, bf));
  let cat = bf < 25 ? 'Fitness' : 'Average';
  document.getElementById('bf-result').style.display = 'block';
  document.getElementById('bf-value').textContent = bf.toFixed(1) + '%';
  document.getElementById('bf-cat').textContent = cat;
}

function calcIdeal(){
  const gender = document.getElementById('ideal-gender').value;
  const hcm = getHeightCm('ideal');
  if(!hcm){ alert('Please enter your height.'); return; }
  const totalInches = hcm / 2.54;
  const base = gender === 'male' ? 50 : 45.5;
  const overInches = Math.max(0, totalInches - 60);
  const idealKg = base + 2.3*overInches;
  const hM = hcm/100;
  const lowKg = 18.5 * hM*hM;
  const highKg = 24.9 * hM*hM;
  document.getElementById('ideal-result').style.display = 'block';
  document.getElementById('ideal-value').textContent = fmtWeight(idealKg);
  document.getElementById('ideal-range').textContent = fmtWeight(lowKg) + ' \u2013 ' + fmtWeight(highKg);
}

function calcPace(){
  const dist = parseFloat(document.getElementById('pace-dist').value);
  const time = parseFloat(document.getElementById('pace-time').value);
  if(!dist || !time) return;
  const pace = time / dist;
  const mins = Math.floor(pace);
  const secs = Math.round((pace - mins) * 60);
  document.getElementById('pace-result').style.display = 'block';
  document.getElementById('pace-value').textContent = `${mins}:${secs < 10 ? '0':''}${secs} /km`;
}

function calcArmyBF(){
  const gender = document.getElementById('army-gender').value;
  const height = parseFloat(document.getElementById('army-height').value);
  const neck = parseFloat(document.getElementById('army-neck').value);
  const waist = parseFloat(document.getElementById('army-waist').value);
  const hip = gender === 'female' ? parseFloat(document.getElementById('army-hip').value) : 0;
  if(!height || !neck || !waist || (gender === 'female' && !hip)){ alert('Please fill in all measurements.'); return; }
  let bf;
  if(gender === 'male'){
    bf = 495/(1.0324 - 0.19077*Math.log10(waist-neck) + 0.15456*Math.log10(height)) - 450;
  } else {
    bf = 495/(1.29579 - 0.35004*Math.log10(waist+hip-neck) + 0.22100*Math.log10(height)) - 450;
  }
  bf = Math.max(2, Math.min(60, bf));
  document.getElementById('army-result').style.display = 'block';
  document.getElementById('army-value').textContent = bf.toFixed(1) + '%';
}

document.getElementById('army-gender')?.addEventListener('change', (e)=>{
  document.getElementById('army-hip-wrap').style.display = e.target.value === 'female' ? 'block' : 'none';
});

function calcLBM(){
  const gender = document.getElementById('lbm-gender').value;
  const w = parseFloat(document.getElementById('lbm-weight').value);
  const h = parseFloat(document.getElementById('lbm-height').value);
  if(!w || !h){ alert('Please enter your weight and height.'); return; }
  const lbm = gender === 'male'
    ? (0.407 * w) + (0.267 * h) - 19.2
    : (0.252 * w) + (0.473 * h) - 48.3;
  document.getElementById('lbm-result').style.display = 'block';
  document.getElementById('lbm-value').textContent = lbm.toFixed(1) + ' kg';
}

function calcHealthyWt(){
  const h = parseFloat(document.getElementById('hw-height').value) / 100;
  if(!h) return;
  document.getElementById('hw-result').style.display = 'block';
  document.getElementById('hw-value').textContent = `${(18.5*h*h).toFixed(1)} kg \u2013 ${(24.9*h*h).toFixed(1)} kg`;
}

function calcCaloriesBurned(){
  const w = parseFloat(document.getElementById('cb-weight').value) || 70;
  const t = parseFloat(document.getElementById('cb-time').value) || 30;
  document.getElementById('cb-result').style.display = 'block';
  document.getElementById('cb-value').textContent = Math.round(7.5 * 3.5 * w / 200 * t) + ' kcal';
}

function calcOneRepMax(){
  const w = parseFloat(document.getElementById('orm-weight').value) || 0;
  const r = parseFloat(document.getElementById('orm-reps').value) || 1;
  const orm = w * (1 + r / 30);
  document.getElementById('orm-result').style.display = 'block';
  document.getElementById('orm-value').textContent = orm.toFixed(1) + ' kg';
}

function calcHeartRate(){
  const age = parseFloat(document.getElementById('hr-age').value) || 30;
  const max = 220 - age;
  document.getElementById('hr-result').style.display = 'block';
  document.getElementById('hr-value').textContent = `${Math.round(max * 0.65)} \u2013 ${Math.round(max * 0.85)} bpm`;
}

function fmtDate(d){
  return d.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
}

function calcPregnancy(){
  const dateStr = document.getElementById('preg-date').value;
  if(!dateStr){ alert('Please enter your last period date.'); return; }
  const lastPeriod = new Date(dateStr);
  const today = new Date();
  const diffDays = Math.floor((today - lastPeriod) / 86400000);
  if(diffDays < 0){ alert('That date is in the future.'); return; }
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  document.getElementById('preg-result').style.display = 'block';
  document.getElementById('preg-value').textContent = `${weeks} weeks, ${days} days`;
}

function calcPregWeight(){
  const w = parseFloat(document.getElementById('pw-weight').value);
  const hcm = parseFloat(document.getElementById('pw-height').value);
  if(!w || !hcm){ alert('Please enter your weight and height.'); return; }
  const hM = hcm / 100;
  const bmi = w / (hM * hM);
  let range;
  if(bmi < 18.5) range = '12.5 \u2013 18 kg';
  else if(bmi < 25) range = '11.5 \u2013 16 kg';
  else if(bmi < 30) range = '7 \u2013 11.5 kg';
  else range = '5 \u2013 9 kg';
  document.getElementById('pw-result').style.display = 'block';
  document.getElementById('pw-value').textContent = range;
}

function calcConception(){
  const dateStr = document.getElementById('conc-date').value;
  if(!dateStr){ alert('Please enter your due date.'); return; }
  const dueDate = new Date(dateStr);
  const conception = new Date(dueDate.getTime() - 266*86400000);
  document.getElementById('conc-result').style.display = 'block';
  document.getElementById('conc-value').textContent = fmtDate(conception);
}

function calcDueDate(){
  const dateStr = document.getElementById('due-date').value;
  if(!dateStr){ alert('Please enter your last period date.'); return; }
  const lastPeriod = new Date(dateStr);
  const due = new Date(lastPeriod.getTime() + 280*86400000);
  document.getElementById('due-result').style.display = 'block';
  document.getElementById('due-value').textContent = fmtDate(due);
}

function calcOvulation(){
  const dateStr = document.getElementById('ov-date').value;
  if(!dateStr){ alert('Please enter your last period date.'); return; }
  const lastPeriod = new Date(dateStr);
  const ovulation = new Date(lastPeriod.getTime() + 14*86400000);
  document.getElementById('ov-result').style.display = 'block';
  document.getElementById('ov-value').textContent = fmtDate(ovulation) + ' (assumes a 28-day cycle)';
}

function calcPeriod(){
  const dateStr = document.getElementById('per-date').value;
  const cycle = parseFloat(document.getElementById('per-cycle').value) || 28;
  if(!dateStr){ alert('Please enter your last period date.'); return; }
  const lastPeriod = new Date(dateStr);
  const next = new Date(lastPeriod.getTime() + cycle*86400000);
  document.getElementById('per-result').style.display = 'block';
  document.getElementById('per-value').textContent = fmtDate(next);
}

function calcMacros(){
  const cal = parseFloat(document.getElementById('macro-cal').value) || 2000;
  document.getElementById('macro-result').style.display = 'block';
  document.getElementById('macro-value').textContent = `P: ${Math.round(cal*0.3/4)}g | C: ${Math.round(cal*0.4/4)}g | F: ${Math.round(cal*0.3/9)}g`;
}

function calcCarbs(){
  const cal = parseFloat(document.getElementById('carb-cal').value) || 2000;
  document.getElementById('carb-result').style.display = 'block';
  document.getElementById('carb-value').textContent = Math.round(cal * 0.5 / 4) + 'g';
}

function calcProtein(){
  const w = parseFloat(document.getElementById('prot-weight').value) || 70;
  document.getElementById('prot-result').style.display = 'block';
  document.getElementById('prot-value').textContent = Math.round(w * 1.8) + 'g';
}

function calcFat(){
  const cal = parseFloat(document.getElementById('fat-cal').value) || 2000;
  document.getElementById('fat-result').style.display = 'block';
  document.getElementById('fat-value').textContent = Math.round(cal * 0.25 / 9) + 'g';
}

function calcTDEE(){
  const bmr = parseFloat(document.getElementById('tdee-bmr').value) || 1500;
  const act = parseFloat(document.getElementById('tdee-act').value) || 1.2;
  document.getElementById('tdee-result').style.display = 'block';
  document.getElementById('tdee-value').textContent = Math.round(bmr * act) + ' kcal';
}

function calcGFR(){
  const age = parseFloat(document.getElementById('gfr-age').value);
  const gender = document.getElementById('gfr-gender').value;
  const creat = parseFloat(document.getElementById('gfr-creat').value);
  if(!age || !creat){ alert('Please enter your age and creatinine level.'); return; }
  let gfr = 175 * Math.pow(creat, -1.154) * Math.pow(age, -0.203);
  if(gender === 'female') gfr *= 0.742;
  let cat, color;
  if(gfr >= 90){ cat = 'Normal'; color = 'var(--vital)'; }
  else if(gfr >= 60){ cat = 'Mildly reduced'; color = 'var(--amber)'; }
  else if(gfr >= 30){ cat = 'Moderately reduced'; color = 'var(--amber)'; }
  else { cat = 'Severely reduced'; color = 'var(--pulse-dark)'; }
  document.getElementById('gfr-result').style.display = 'block';
  document.getElementById('gfr-value').textContent = Math.round(gfr) + ' mL/min';
  const badge = document.getElementById('gfr-cat');
  badge.textContent = cat;
  badge.style.background = color;
}

function calcBodyType(){
  const type = document.getElementById('bt-type').value;
  document.getElementById('bt-result').style.display = 'block';
  document.getElementById('bt-value').textContent = type.toUpperCase();
}

function calcBSA(){
  const w = parseFloat(document.getElementById('bsa-wt').value) || 70;
  const h = parseFloat(document.getElementById('bsa-ht').value) || 175;
  const bsa = Math.sqrt((w * h) / 3600);
  document.getElementById('bsa-result').style.display = 'block';
  document.getElementById('bsa-value').textContent = bsa.toFixed(2) + ' m\u00b2';
}

function calcBAC(){
  const drinks = parseFloat(document.getElementById('bac-drinks').value);
  const w = parseFloat(document.getElementById('bac-wt').value);
  const gender = document.getElementById('bac-gender').value;
  if(!drinks || !w){ alert('Please enter drinks consumed and weight.'); return; }
  const r = gender === 'male' ? 0.68 : 0.55;
  const bac = (drinks * 14 * 100) / (w * 1000 * r);
  document.getElementById('bac-result').style.display = 'block';
  document.getElementById('bac-value').textContent = bac.toFixed(3) + '%';
}

// Unit toggle (only present on pages that have .unit-btn elements)
document.querySelectorAll('.unit-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.unit-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const unit = btn.dataset.unit;
    document.querySelectorAll('.unit-metric').forEach(el=> el.style.display = unit==='metric' ? 'flex' : 'none');
    document.querySelectorAll('.unit-imperial').forEach(el=> el.style.display = unit==='imperial' ? 'flex' : 'none');
  });
});

// Body fat: show hip field only for female (only present on the body-fat page)
document.getElementById('bf-gender')?.addEventListener('change', (e)=>{
  const hipWrap = document.getElementById('bf-hip-wrap');
  if(hipWrap) hipWrap.style.display = e.target.value === 'female' ? 'block' : 'none';
});
