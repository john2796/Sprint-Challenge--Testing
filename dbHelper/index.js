const db = require('../data/dbConfig');
const sqliteErrors = require('./errorList');

// get all & query name & pagination
// query by firstname
function find(tbl, query) {
  const { limit = 5, page = 1, name } = query;
  let table;
  if (!name) {
    table = db
      .select()
      .from(tbl)
      .orderBy('id', 'desc')
      .paginate(limit, page, true);
  } else {
    table = db
      .select()
      .from(tbl)
      .orderBy('id', 'desc')
      .where('firstname', 'like', `%${name}%`)
      .paginate(limit, page, true);
  }

  return table;
}
// find by id
function findById(tbl, id) {
  return db
    .select()
    .from(tbl)
    .where(id)
    .first();
}
function findBy(tbl, query) {
  return db
    .select()
    .from(tbl)
    .where(query);
}
function insert(tbl, post) {
  return db.insert(post).into(tbl);
}
function update(tbl, id, changes) {
  return db
    .update(changes)
    .from(tbl)
    .where({ id });
}
function remove(tbl, id) {
  return db
    .del()
    .from(tbl)
    .where({ id });
}

function errHelper(res, err) {
  const error = err && err.errno ? sqliteErrors[err.errno] : err;
  res.status(500).json({ message: error });
}

module.exports = {
  find,
  findById,
  findBy,
  insert,
  update,
  remove,
  errHelper,
};
