CREATE TABLE IF NOT EXISTS user_account (
                              id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                              username VARCHAR(255) NOT NULL UNIQUE,
                              password TEXT NOT NULL,
                              created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reflection (
                            id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                            user_id INT NOT NULL,
                            title VARCHAR(50) NOT NULL,
                            content TEXT,
                            drawing TEXT,
                            created_at TIMESTAMP DEFAULT NOW(),
                            CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES user_account(id) ON DELETE CASCADE
);