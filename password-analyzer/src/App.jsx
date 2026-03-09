import { useState, useEffect } from "react";

const GOOGLE_FONT = `@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;600;700;800&display=swap');`;

const styles = `
  ${GOOGLE_FONT}

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .psa-root {
    min-height: 100vh;
    background: #080b0f;
    font-family: 'Syne', sans-serif;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .psa-grid-bg {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,255,128,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,128,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .psa-glow {
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,128,0.06) 0%, transparent 70%);
    top: -200px;
    right: -200px;
    pointer-events: none;
  }

  .psa-card {
    width: 100%;
    max-width: 560px;
    background: rgba(10,14,20,0.95);
    border: 1px solid rgba(0,255,128,0.15);
    border-radius: 4px;
    padding: 2.5rem;
    position: relative;
    box-shadow: 0 0 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,128,0.05);
  }

  .psa-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff80, transparent);
    opacity: 0.6;
  }

  .psa-header {
    margin-bottom: 2rem;
  }

  .psa-badge {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: #00ff80;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }

  .psa-title {
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #f0fdf4;
    line-height: 1.1;
  }

  .psa-subtitle {
    font-size: 0.8rem;
    color: #4a6358;
    margin-top: 0.4rem;
    font-family: 'Share Tech Mono', monospace;
  }

  .psa-input-wrap {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .psa-input {
    width: 100%;
    background: rgba(0,255,128,0.03);
    border: 1px solid rgba(0,255,128,0.2);
    border-radius: 3px;
    padding: 0.9rem 3rem 0.9rem 1rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1rem;
    color: #00ff80;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    letter-spacing: 0.05em;
  }

  .psa-input::placeholder {
    color: #2a3d33;
    letter-spacing: 0.05em;
  }

  .psa-input:focus {
    border-color: rgba(0,255,128,0.5);
    box-shadow: 0 0 0 3px rgba(0,255,128,0.07);
  }

  .psa-eye {
    position: absolute;
    right: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #2a5c3f;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.2rem;
    transition: color 0.2s;
  }
  .psa-eye:hover { color: #00ff80; }

  /* Strength bar */
  .psa-bar-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    color: #3a5a47;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .psa-bar-track {
    display: flex;
    gap: 4px;
    margin-bottom: 0.5rem;
  }

  .psa-bar-seg {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: rgba(255,255,255,0.06);
    transition: background 0.4s ease;
  }

  .psa-bar-seg.active-0 { background: #ff3b3b; box-shadow: 0 0 6px #ff3b3b88; }
  .psa-bar-seg.active-1 { background: #ff8c00; box-shadow: 0 0 6px #ff8c0088; }
  .psa-bar-seg.active-2 { background: #ffd600; box-shadow: 0 0 6px #ffd60088; }
  .psa-bar-seg.active-3 { background: #00e676; box-shadow: 0 0 6px #00e67688; }
  .psa-bar-seg.active-4 { background: #00ff80; box-shadow: 0 0 8px #00ff8099; }

  .psa-strength-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .psa-strength-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .psa-crack-time {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: #3a5a47;
  }

  .psa-crack-time span {
    color: #00cc66;
  }

  /* Checklist */
  .psa-checks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .psa-check {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: #2a4a38;
    transition: color 0.3s;
  }

  .psa-check.met { color: #00cc66; }

  .psa-check-icon {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #1a3028;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.55rem;
    flex-shrink: 0;
    transition: all 0.3s;
  }

  .psa-check.met .psa-check-icon {
    background: rgba(0,255,128,0.15);
    border-color: #00ff80;
    color: #00ff80;
  }

  /* Entropy section */
  .psa-divider {
    border: none;
    border-top: 1px solid rgba(0,255,128,0.08);
    margin: 1.25rem 0;
  }

  .psa-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .psa-stat {
    background: rgba(0,255,128,0.03);
    border: 1px solid rgba(0,255,128,0.08);
    border-radius: 3px;
    padding: 0.75rem;
    text-align: center;
  }

  .psa-stat-val {
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.1rem;
    color: #00cc66;
    font-weight: bold;
    display: block;
  }

  .psa-stat-lbl {
    font-size: 0.6rem;
    color: #2a4a38;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.2rem;
    display: block;
  }

  /* Suggestions */
  .psa-suggestions {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .psa-suggestion {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.68rem;
    color: #ff8c00;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    line-height: 1.4;
  }

  .psa-suggestion::before {
    content: '▶';
    font-size: 0.5rem;
    margin-top: 0.15rem;
    flex-shrink: 0;
    color: #cc6600;
  }

  .psa-section-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    color: #2a4a38;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }

  .psa-empty {
    text-align: center;
    padding: 2rem 0 1rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: #1a3028;
    letter-spacing: 0.1em;
  }

  .psa-cursor {
    display: inline-block;
    width: 8px;
    height: 1em;
    background: #00ff80;
    margin-left: 2px;
    vertical-align: middle;
    animation: blink 1s step-end infinite;
    opacity: 0.7;
  }

  @keyframes blink {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 0; }
  }

  .psa-footer {
    margin-top: 1.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    color: #1a2e22;
    text-align: center;
    letter-spacing: 0.1em;
  }
`;

const STRENGTH_LEVELS = [
  { label: "Critical", color: "#ff3b3b" },
  { label: "Weak", color: "#ff8c00" },
  { label: "Fair", color: "#ffd600" },
  { label: "Strong", color: "#00e676" },
  { label: "Fortress", color: "#00ff80" },
];

function analyzePassword(pwd) {
  if (!pwd) return null;

  const checks = {
    length8: pwd.length >= 8,
    length12: pwd.length >= 12,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    numbers: /[0-9]/.test(pwd),
    symbols: /[^A-Za-z0-9]/.test(pwd),
    noRepeat: !/(.)\1{2,}/.test(pwd),
    noCommon: !["password","123456","qwerty","abc123","letmein","admin","welcome"].includes(pwd.toLowerCase()),
  };

  let score = 0;
  if (checks.length8) score++;
  if (checks.length12) score++;
  if (checks.uppercase && checks.lowercase) score++;
  if (checks.numbers) score++;
  if (checks.symbols) score++;
  if (checks.noRepeat) score = Math.max(score, 1);
  if (!checks.noCommon) score = 0;

  score = Math.min(4, Math.max(0, score - 1 + (checks.noCommon ? 1 : 0)));

  // Charset size for entropy
  let charsetSize = 0;
  if (/[a-z]/.test(pwd)) charsetSize += 26;
  if (/[A-Z]/.test(pwd)) charsetSize += 26;
  if (/[0-9]/.test(pwd)) charsetSize += 10;
  if (/[^A-Za-z0-9]/.test(pwd)) charsetSize += 32;

  const entropy = Math.floor(pwd.length * Math.log2(charsetSize || 1));

  // Crack time estimate (guesses/sec at 10B/s)
  const guesses = Math.pow(charsetSize || 1, pwd.length);
  const seconds = guesses / 1e10;
  let crackTime = "";
  if (seconds < 1) crackTime = "instantly";
  else if (seconds < 60) crackTime = `${Math.round(seconds)}s`;
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)}min`;
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)}hrs`;
  else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)}days`;
  else if (seconds < 31536000 * 1000) crackTime = `${Math.round(seconds / 31536000)}yrs`;
  else crackTime = "centuries";

  const suggestions = [];
  if (!checks.length8) suggestions.push("Use at least 8 characters");
  else if (!checks.length12) suggestions.push("Aim for 12+ characters for better security");
  if (!checks.uppercase) suggestions.push("Add uppercase letters (A-Z)");
  if (!checks.lowercase) suggestions.push("Add lowercase letters (a-z)");
  if (!checks.numbers) suggestions.push("Include numbers (0-9)");
  if (!checks.symbols) suggestions.push("Add symbols (!, @, #, $...)");
  if (!checks.noRepeat) suggestions.push("Avoid repeated characters (aaa, 111)");
  if (!checks.noCommon) suggestions.push("This is a commonly known password — change it");

  return { score, checks, entropy, crackTime, suggestions, length: pwd.length, charset: charsetSize };
}

const CHECK_ITEMS = [
  { key: "length8", label: "8+ chars" },
  { key: "length12", label: "12+ chars" },
  { key: "uppercase", label: "Uppercase" },
  { key: "lowercase", label: "Lowercase" },
  { key: "numbers", label: "Numbers" },
  { key: "symbols", label: "Symbols" },
  { key: "noRepeat", label: "No repeats" },
  { key: "noCommon", label: "Not common" },
];

export default function App() {
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const result = analyzePassword(pwd);

  return (
    <>
      <style>{styles}</style>
      <div className="psa-root">
        <div className="psa-grid-bg" />
        <div className="psa-glow" />

        <div className="psa-card">
          <div className="psa-header">
            <div className="psa-badge">// security tool v1.0</div>
            <h1 className="psa-title">Password<br />Analyzer</h1>
            <div className="psa-subtitle">Real-time strength analysis & crack estimation</div>
          </div>

          {/* Input */}
          <div className="psa-input-wrap">
            <input
              className="psa-input"
              type={show ? "text" : "password"}
              placeholder="Enter password to analyze..."
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <button className="psa-eye" onClick={() => setShow(s => !s)} title={show ? "Hide" : "Show"}>
              {show ? "🙈" : "👁"}
            </button>
          </div>

          {!result ? (
            <div className="psa-empty">
              awaiting input<span className="psa-cursor" />
            </div>
          ) : (
            <>
              {/* Strength bar */}
              <div className="psa-bar-label">// signal strength</div>
              <div className="psa-bar-track">
                {[0,1,2,3,4].map(i => (
                  <div
                    key={i}
                    className={`psa-bar-seg${i <= result.score ? ` active-${result.score}` : ""}`}
                  />
                ))}
              </div>

              <div className="psa-strength-row">
                <span className="psa-strength-label" style={{ color: STRENGTH_LEVELS[result.score].color }}>
                  {STRENGTH_LEVELS[result.score].label}
                </span>
                <span className="psa-crack-time">
                  crack time: <span>{result.crackTime}</span>
                </span>
              </div>

              {/* Requirement checklist */}
              <div className="psa-section-title">// requirements</div>
              <div className="psa-checks">
                {CHECK_ITEMS.map(({ key, label }) => (
                  <div key={key} className={`psa-check${result.checks[key] ? " met" : ""}`}>
                    <div className="psa-check-icon">
                      {result.checks[key] ? "✓" : ""}
                    </div>
                    {label}
                  </div>
                ))}
              </div>

              <hr className="psa-divider" />

              {/* Stats */}
              <div className="psa-section-title">// metrics</div>
              <div className="psa-stats">
                <div className="psa-stat">
                  <span className="psa-stat-val">{result.length}</span>
                  <span className="psa-stat-lbl">Length</span>
                </div>
                <div className="psa-stat">
                  <span className="psa-stat-val">{result.entropy}</span>
                  <span className="psa-stat-lbl">Entropy (bits)</span>
                </div>
                <div className="psa-stat">
                  <span className="psa-stat-val">{result.charset}</span>
                  <span className="psa-stat-lbl">Charset size</span>
                </div>
              </div>

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <>
                  <hr className="psa-divider" />
                  <div className="psa-section-title">// recommendations</div>
                  <div className="psa-suggestions">
                    {result.suggestions.map((s, i) => (
                      <div key={i} className="psa-suggestion">{s}</div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          <div className="psa-footer">
            no passwords stored or transmitted — fully client-side
          </div>
        </div>
      </div>
    </>
  );
}
