CREATE TABLE IF NOT EXISTS user_account (
                              id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                              username VARCHAR(255) NOT NULL UNIQUE,
                              password TEXT NOT NULL,
                              created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reflection (
                            id UUID NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                            user_id INT NOT NULL,
                            title VARCHAR(50) NOT NULL,
                            content TEXT,
                            date DATE NOT NULL DEFAULT NOW(),
                            drawing_paths jsonb NOT NULL DEFAULT '[]',
                            created_at TIMESTAMPTZ DEFAULT NOW(),
                            last_synced_at TIMESTAMPTZ DEFAULT NOW(),
                            updated_at TIMESTAMPTZ DEFAULT NOW(),
                            CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES user_account(id) ON DELETE CASCADE
);