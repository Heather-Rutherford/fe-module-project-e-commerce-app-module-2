const fetch = require("node-fetch");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = getFirestore();

async function importProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const batch = db.batch();
  products.forEach((product) => {
    const docRef = db.collection("products").doc(product.id.toString());
    batch.set(docRef, product);
  });

  await batch.commit();
  console.log("Products imported!");
}

importProducts().catch(console.error);
