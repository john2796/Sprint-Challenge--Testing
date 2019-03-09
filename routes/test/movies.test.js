const request = require('supertest');
const knex = require('knex');
const dbConfig = require('../../knexfile');

const server = require('../../server');

const db = knex(dbConfig.development);

describe('games CRUD operations', () => {
  afterEach(async () => {
    await db('games').truncate();
  });
});

describe('-------------------------------GET ROUTE-------------------------------', () => {
  it('[ GET 200 ]should return a status code of 200 upon success', async (done) => {
    const response = await request(server).get('/api/games');

    expect(response.status).toBe(200);

    done();
  });
  //------------------------------------------------------------------------------------
  it('[ GET ] should return an array of games', async () => {
    const response = await request(server).get('/api/games');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
  //------------------------------------------------------------------------------------

  it('[ GET/:id 200 ]should return a status code of 200 upon success for individual games', async (done) => {
    await request(server)
      .post('/api/games')
      .send({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      });

    const response = await request(server).get('/api/games/1');
    expect(response.status).toBe(200);

    done();
  });

  //------------------------------------------------------------------------------------
  it('[ GET/:id 404 ]  should return 404 if student is not found', async () => {
    const response = await request(server).get('/api/games/10000');
    expect(response.status).toBe(404);
  });
});

describe('------------------------------- POST ROUTE -------------------------------', () => {
  //------------------------------------------------------------------------------------
  it('[ POST 200 ] should return 200  ', async (done) => {
    const response = await request(server)
      .post('/api/games')
      .send({
        title: 'Pacmans',
        genre: 'Arcade',
        releaseYear: 1980,
      });

    expect(response.status).toBe(200);

    done();
  });
  it('[ POST 400 ] should return 400 if body is invalid  ', async (done) => {
    const response = await request(server)
      .post('/api/games')
      .send({
        wrongTitle: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      });

    expect(response.status).toBe(400);

    done();
  });
  // it('[ POST 401 ] should return 401 if not logged in  ', async (done) => {
  //   const response = await request(server).post('/api/games').send({
  //     name: undefined, cohort: undefined,
  //   });

  //   expect(response.status).toBe(400);

  //   done();
  // });
});
//------------------------------------------------------------------------------------
describe('------------------------------- DELETE ROUTE------------------------------- ', () => {
  //------------------------------------------------------------------------------------
  it('[ DELETE ] should delete the student with the specified id', async () => {
    await request(server)
      .post('/api/games/')
      .send({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      });
    await request(server).delete('/api/games/1');
    const response = await request(server).get('/api/games/1');
    expect(response.status).toBe(404);
  });
  //------------------------------------------------------------------------------------
  it('[ DELETE 200 ] should give status of 200', async () => {
    await request(server)
      .post('/api/games/')
      .send({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      });
    const response = await request(server).delete('/api/games/2');
    expect(response.status).toBe(200);
  });
  //------------------------------------------------------------------------------------
  it('[ DELETE 404 ]should give status of 404 if student does not exist', async () => {
    await request(server)
      .post('/api/games/')
      .send({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      });
    const response = await request(server).delete('/api/games/1230');
    expect(response.status).toBe(404);
  });
});
//------------------------------------------------------------------------------------
describe('------------------------------- PUT ROUTE-------------------------------', () => {
  //------------------------------------------------------------------------------------
  it('[ PUT  ] should update student name', async () => {
    await request(server)
      .post('/api/games/')
      .send({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      });
    await request(server)
      .put('/api/games/5')
      .send({
        title: 'updated',
        genre: 'Arcade',
        releaseYear: 1980,
      });
    const response = await request(server).get('/api/games/5');
    console.log(response.body);
    expect(response.body.title).toBe('updated');
  });
  // ------ ------------------------------------------------------------------------------
  // it('[ PUT 403 ] should return 403 if user is not logged in', async () => {
  //   await request(server).post('/api/games/').send({
  //     name: 'mikko',
  //     cohort: 'web16',
  //   }).set('Authorization', token);;

  //   const response = await request(server).put('/api/games/1').send({
  //     name: 'new name',
  //   }).set('Authorization', token);

  //   expect(response.status).toBe(403);
  // });
});
