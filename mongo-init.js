db = db.getSiblingDB('myfullauth');

db.createUser({
  user: "admin",
  pwd: "password",
  roles: [{ role: "readWrite", db: "myfullauth" }]
});

print("✅ User 'admin' created successfully in 'myfullauth' database.");