var config = require("./dbconfig");
const sql = require("mssql");

//FUNCION PARA RETORNAR UN SELECT
async function getCategoria() {
  try {
    let pool = await sql.connect(config);
    let categorias = await pool.request().query("SELECT * FROM TM_CATEGORIA");
    return categorias.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//FUNCION PARA RETORNAR UN SELECT POR ID
async function getCategoria_x_id(cat_id) {
  try {
    let pool = await sql.connect(config);
    let categorias = await pool
      .request()
      .input("input_parameter", sql.Int, cat_id)
      .query("SELECT * FROM TM_CATEGORIA where CAT_ID = @input_parameter");
    return categorias.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function insertCategoria(categoria) {
  try {
    let pool = await sql.connect(config);
    let InsertCategorias = await pool
      .request()

      .input("cat_id", sql.Int, categoria.cat_id)
      .input("cat_nom", sql.VarChar, categoria.cat_nom)
      .input("cat_obs", sql.VarChar, categoria.cat_obs)
      .execute("SP_I_CATEGORIA_01");
    return InsertCategorias.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCategoria: getCategoria,
  getCategoria_x_id: getCategoria_x_id,
  insertCategoria : insertCategoria
};
