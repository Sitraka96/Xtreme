
module.exports = (socketSessionMiddleware, io) => {
  io_user = io.of('/user');

  io_user.use(socketSessionMiddleware);
  
  io_user.on('connection', client => {
    console.log('user ok');
  });

  return io_user;
}