// import models here
const { user, profile, chat } = require('../../models');

const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('client connect: ', socket.id);

    socket.on('load admin contact', async () => {
      try {
        const data = await user.findAll({
          include: {
            model: profile,
            as: 'profile',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          where: {
            status: 'admin',
          },
        });

        socket.emit('admin contact', data);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('load customer contact', async () => {
      try {
        const data = await user.findAll({
          include: [
            {
              model: profile,
              as: 'profile',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: chat,
              as: 'recipientMessage',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'idRecipient', 'idSender'],
              },
            },
            {
              model: chat,
              as: 'senderMessage',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'idRecipient', 'idSender'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          where: {
            status: 'customer',
          },
        });

        socket.emit('customer contact', data);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('client disconnect');
    });
  });
};

module.exports = socketIo;
