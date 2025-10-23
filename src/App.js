import React, { useState } from "react";
import "./App.css";

const SCHEMA_OPTIONS = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
];

function App() {
    const [showPopup, setShowPopup] = useState(false);
    const [segmentName, setSegmentName] = useState("");
    const [schemas, setSchemas] = useState([]);
    const [selectedSchema, setSelectedSchema] = useState("");
    const [output, setOutput] = useState(null);

    const handleAddSchema = () => {
        if (!selectedSchema) return;
        const selected = SCHEMA_OPTIONS.find(o => o.value === selectedSchema);
        setSchemas([...schemas, { ...selected, inputValue: "" }]);
        setSelectedSchema("");
    };

    const handleSaveSegment = () => {
        const data = {
            segment_name: segmentName.trim(),
            schema: schemas.map(s => ({ [s.value]: s.inputValue })),
        };

    console.log( JSON.stringify(data, null, 2));
    alert("Segment saved! Check console for output.");
    setShowPopup(false);
    };
    const remainingOptions = SCHEMA_OPTIONS.filter(
        o => !schemas.some(s => s.value === o.value)
    );

    return (
        <div className="app-container">
        <button className="save-btn" onClick={() => setShowPopup(true)}>
            Save Segment
        </button>

        {showPopup && (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Save Segment</h2>

            <input
                type="text"
                placeholder="Enter segment name"
                value={segmentName}
                onChange={e => setSegmentName(e.target.value)}
            />

            <div className="dropdown-section">
                <select
                    value={selectedSchema}
                    onChange={e => setSelectedSchema(e.target.value)}
                 >
                <option value="">Add schema to segment</option>
                    {remainingOptions.map(o => (
                        <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                    ))}
                </select>

                <button className="add-link" onClick={handleAddSchema}>
                + Add new schema
                </button>
            </div>

            <div className="schema-box">
                {schemas.map((schema, index) => (
                    <div key={index} className="schema-item">
                        <select
                            value={schema.value}
                            onChange={e => {
                            const updatedSchemas = [...schemas];
                            updatedSchemas[index] = SCHEMA_OPTIONS.find(
                                opt => opt.value === e.target.value
                            );
                        updatedSchemas[index].inputValue = schema.inputValue;
                        setSchemas(updatedSchemas);
                        }}>
                    {SCHEMA_OPTIONS.map(o => (
                        <option
                            key={o.value}
                            value={o.value}
                            disabled={schemas.some(
                            s => s.value === o.value && s.value !== schema.value
                            )}>
                        {o.label}
                      </option>
                    ))}
                  </select>

                  <input
                      type="text"
                      placeholder={`Enter ${schema.label}`}
                      value={schema.inputValue}
                          onChange={e => {
                              const updatedSchemas = [...schemas];
                              updatedSchemas[index].inputValue = e.target.value;
                          setSchemas(updatedSchemas);
                        }}/>
                    </div>
              ))}
            </div>

            <div className="actions">
                <button onClick={handleSaveSegment}>Save Segment</button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
