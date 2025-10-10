export async function seeder(Schema, seed, prop) {
  try {
    seed.map(async (seed) => {
      const exist = await Schema.findOne({ [prop]: seed[prop] });
      if (exist) {
        return 
      }
      //   ──────────────────────────────────────────────────────────────────────
      const newData = new Schema({ ...seed });
      const dataSaved = await newData.save();
      console.log(dataSaved);
    });
  } catch (error) {
    console.error("error al seedear datos:", error);
  }
}
