CREATE TABLE patients
(
    id_patient UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dni NUMERIC(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INTEGER CHECK (age >= 0),
    email VARCHAR(320) UNIQUE NOT NULL,
    professional_id UUID,
    diagnosis TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    CONSTRAINT fk_patients_professional FOREIGN KEY (professional_id)
    REFERENCES professionals(id_professional) ON DELETE CASCADE
)