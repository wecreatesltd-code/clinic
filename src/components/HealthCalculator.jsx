import { useState } from 'react';

export default function HealthCalculator() {
  const [activeTab, setActiveTab] = useState('bmi'); // 'bmi' | 'water'

  // BMI State
  const [height, setHeight] = useState(170); // in cm
  const [weight, setWeight] = useState(68); // in kg
  const [bmiResult, setBmiResult] = useState(null);

  // Water State
  const [waterWeight, setWaterWeight] = useState(70);
  const [activityMinutes, setActivityMinutes] = useState(30);
  const [waterResult, setWaterResult] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight || height <= 0 || weight <= 0) return;
    const heightInMeters = height / 100;
    const bmiVal = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let status = '';
    let statusClass = '';
    let recommendation = '';

    if (bmiVal < 18.5) {
      status = 'Underweight';
      statusClass = 'status-warning';
      recommendation = 'Focus on nutrient-dense meals and consult our nutrition team for healthy weight gain.';
    } else if (bmiVal >= 18.5 && bmiVal < 25) {
      status = 'Healthy Weight';
      statusClass = 'status-success';
      recommendation = 'Great job! Maintain your balanced diet, exercise routine, and annual checkups.';
    } else if (bmiVal >= 25 && bmiVal < 30) {
      status = 'Overweight';
      statusClass = 'status-warning';
      recommendation = 'Cardio exercise and portion control can help optimize cardiovascular wellness.';
    } else {
      status = 'Obese';
      statusClass = 'status-danger';
      recommendation = 'We recommend consulting our clinical nutrition and endocrinology specialists.';
    }

    setBmiResult({
      value: bmiVal,
      status,
      statusClass,
      recommendation
    });
  };

  const calculateWater = () => {
    if (!waterWeight || waterWeight <= 0) return;
    // Standard formula: 35ml per kg + 350ml per 30 min of exercise
    const baseMl = waterWeight * 35;
    const exerciseMl = (activityMinutes / 30) * 350;
    const totalLiters = ((baseMl + exerciseMl) / 1000).toFixed(1);
    const glasses = Math.round((baseMl + exerciseMl) / 250);

    setWaterResult({
      liters: totalLiters,
      glasses
    });
  };

  return (
    <section id="health-calc" className="section-padding health-calc-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Interactive Wellness</span>
          <h2 className="section-title">Free Patient Health Tools</h2>
          <p className="section-subtitle">
            Calculate your clinical metrics instantly to monitor your personal wellness between clinic visits.
          </p>
        </div>

        <div className="calc-card">
          <div className="calc-tabs">
            <button
              className={`calc-tab-btn ${activeTab === 'bmi' ? 'active' : ''}`}
              onClick={() => setActiveTab('bmi')}
            >
              ⚖️ Body Mass Index (BMI)
            </button>
            <button
              className={`calc-tab-btn ${activeTab === 'water' ? 'active' : ''}`}
              onClick={() => setActiveTab('water')}
            >
              💧 Hydration Calculator
            </button>
          </div>

          <div className="calc-body">
            {activeTab === 'bmi' ? (
              <div className="calc-tab-content">
                <div className="calc-inputs-grid">
                  <div className="calc-input-box">
                    <label>
                      Height: <strong>{height} cm</strong>
                    </label>
                    <input
                      type="range"
                      min="120"
                      max="220"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="calc-slider"
                    />
                    <div className="slider-limits">
                      <span>120 cm</span>
                      <span>220 cm</span>
                    </div>
                  </div>

                  <div className="calc-input-box">
                    <label>
                      Weight: <strong>{weight} kg</strong>
                    </label>
                    <input
                      type="range"
                      min="35"
                      max="160"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="calc-slider"
                    />
                    <div className="slider-limits">
                      <span>35 kg</span>
                      <span>160 kg</span>
                    </div>
                  </div>
                </div>

                <div className="calc-action-bar">
                  <button className="btn btn-primary" onClick={calculateBMI}>
                    Calculate BMI Score
                  </button>
                </div>

                {bmiResult && (
                  <div className="calc-result-box">
                    <div className="result-top">
                      <div className="result-number">{bmiResult.value}</div>
                      <div className={`result-tag ${bmiResult.statusClass}`}>
                        {bmiResult.status}
                      </div>
                    </div>
                    <p className="result-advice">{bmiResult.recommendation}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="calc-tab-content">
                <div className="calc-inputs-grid">
                  <div className="calc-input-box">
                    <label>
                      Body Weight: <strong>{waterWeight} kg</strong>
                    </label>
                    <input
                      type="range"
                      min="35"
                      max="140"
                      value={waterWeight}
                      onChange={(e) => setWaterWeight(Number(e.target.value))}
                      className="calc-slider"
                    />
                  </div>

                  <div className="calc-input-box">
                    <label>
                      Daily Exercise / Activity: <strong>{activityMinutes} min</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="120"
                      step="15"
                      value={activityMinutes}
                      onChange={(e) => setActivityMinutes(Number(e.target.value))}
                      className="calc-slider"
                    />
                  </div>
                </div>

                <div className="calc-action-bar">
                  <button className="btn btn-secondary" onClick={calculateWater}>
                    Calculate Daily Water Intake
                  </button>
                </div>

                {waterResult && (
                  <div className="calc-result-box">
                    <div className="result-top">
                      <div className="result-number">{waterResult.liters} Liters / Day</div>
                      <div className="result-tag status-success">
                        ~{waterResult.glasses} standard glasses
                      </div>
                    </div>
                    <p className="result-advice">
                      Drinking adequate water maintains kidney function, clears skin, and prevents midday fatigue.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
