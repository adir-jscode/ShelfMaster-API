import app from "./app";

async function main() {
  try {
    app.listen(`${process.env.PORT}`, () => {
      console.log(` ✅ App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
