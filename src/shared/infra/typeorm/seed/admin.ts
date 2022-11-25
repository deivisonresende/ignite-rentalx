import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");
  const id = uuidV4();
  const password = await hash("admrentalx", 8);
  await connection.query(` 
    INSERT INTO users
    (id, name, email, password, "isAdmin", created_at, driver_license, avatar) 
    VALUES ('${id}','admin','admin@rentalx.com.br','${password}','true','now()', 'xxxxx', 'avatar')
  `);

  await connection.close();
}

create().then(() => console.log("User admin created"));
