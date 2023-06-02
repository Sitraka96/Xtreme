const cors = require('cors');

module.exports = (socketSessionMiddleware, io) => {
  io_admin = io.of('/admin');

  io_admin.use(socketSessionMiddleware);

  io_admin.use(require('../controller/middleware/protect_socket_admin'));
  io_admin.on('connection', client => {
    console.log('admin ok');
  });

  return io_admin;
}