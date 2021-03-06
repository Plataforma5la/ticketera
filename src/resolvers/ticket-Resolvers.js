const S = require("sequelize");
const Op = S.Op;
const { Ticket, Tag, Comment, User } = require("../db/models/index");
const { fullTicket } = require("./index");

const fetchTickets = (req, res) => {
  Ticket.findAll({
    order: [["id", "ASC"]],
    include: fullTicket
  })
    .then(tickets => res.send(tickets))
    .catch(err => res.status(404).send(err));
};

const fetchStatus = (req, res) => {
  Ticket.findAll({
    where: { statusId: req.params.statusId },
    include: fullTicket,
    order: [["id", "ASC"]]
  })
    .then(tickets => res.send(tickets))
    .catch(err => res.status(404).send(err));
};

const createTicket = (req, res) => {
  if (req.body.title) {
    Ticket.create(req.body)
      .then(ticket =>
        ticket
          .setStatus(1)
          .then(() => ticket.setAuthor(req.user.id))
          .then(() => res.status(201).send(ticket))
      )
      .catch(err => {
        res.status(404).send(err);
      });
  } else {
    res.sendStatus(400);
  }
};

const editTicket = (req, res) => {
  Ticket.update(req.body, {
    where: {
      id: req.params.ticketId
    }
  })
    .then(() =>
      Ticket.findOne({
        where: { id: req.params.ticketId },
        include: fullTicket
      }).then(ticket => res.status(200).send(ticket))
    )
    .catch(err => res.status(404).send(err));
};

const deleteTicket = (req, res) => {
  Ticket.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(202))
    .catch(err => res.status(404).send(err));
};

const removeTag = (req, res) => {
  Ticket.findOne({
    where: {
      id: req.params.ticketId
    }
  })
    .then(ticket => ticket.removeTag(req.params.tagId))
    .then(() =>
      Ticket.findOne({
        where: {
          id: req.params.ticketId
        },
        include: fullTicket
      }).then(tickets => res.send(tickets))
    )
    .catch(err => res.status(404).send(err));
};

const addTag = (req, res) => {
  Ticket.findOne({
    where: {
      id: req.params.ticketId
    }
  })
    .then(ticket => ticket.addTag(req.params.tagId))
    .then(() =>
      Ticket.findOne({
        where: {
          id: req.params.ticketId
        } /* ,
        include: [{ all: true }] */
      }).then(updatedTicket => res.send(updatedTicket))
    )
    .catch(err => {
      res.status(404).send(err);
    });
};

const addParticipant = (req, res) => {
  Ticket.findOne({
    where: {
      id: req.body.ticketId
    }
  })
    .then(ticket => ticket.addUser(req.user))
    .then(() =>
      Ticket.findAll({
        where: {
          statusId: req.body.statusId
        },
        order: [["id", "ASC"]],
        include: fullTicket
      }).then(tickets => res.send(tickets))
    )
    .catch(err => res.status(404).send(err));
};

const removeParticipant = (req, res) => {
  Ticket.findOne({
    where: {
      id: req.body.ticketId
    }
  })
    .then(ticket => {
      return ticket.removeUser(req.user);
    })
    .then(() => {
      Ticket.findAll({
        where: {
          statusId: req.body.statusId
        },
        order: [["id", "ASC"]],
        include: fullTicket
      }).then(tickets => res.send(tickets));
    })
    .catch(err => res.status(404).send(err));
};

const editComment = (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.commentId
    }
  })
    .then(() =>
      Ticket.findOne({
        where: { id: req.params.ticketId },
        include: fullTicket
      }).then(ticket => res.status(200).send(ticket))
    )
    .catch(err => res.status(404).send(err));
};

const userTickets = (req, res) => {
  if (req.user.isAdmin) {
    Ticket.findAll({
      where: {
        statusId: {
          [Op.ne]: 1
        }
      },
      include: fullTicket
    }).then(tickets => {
      const filteredTickets = tickets.filter(
        ticket => ticket.comment.replier.id === req.user.id
      );
      res.send(filteredTickets);
    });
  } else {
    Ticket.findAll({ include: fullTicket })
      .then(tickets => {
        const filtertedUserTickets = tickets.filter(
          ticket =>
            ticket.authorId === req.user.id ||
            ticket.users.some(user => user.id === req.user.id)
        );
        res.send(filtertedUserTickets);
      })
      .catch(err => console.log(err));
  }
};

const fetchTicket = (req, res) => {
  Ticket.findOne({
    where: {
      slug: req.params.slug
    },
    include: fullTicket
  })
    .then(ticket => res.status(200).send(ticket))
    .catch(err => console.log(err));
};

const createImage = (req, res) => {
  Ticket.findByPk(req.params.id)
    .then(ticket =>
      ticket.update({
        images: S.fn(
          "array_append",
          S.col("images"),
          `/uploaded-images/${req.files[0].filename}`
        )
      })
    )
    .then(() => res.sendStatus(201));
};

const getDevpedia = (req, res) => {
  if (req.query.title) {
    Ticket.findAll({
      order: [["updatedAt", "DESC"]],
      where: {
        statusId: 3,
        [Op.or]: [{ title: { [Op.iLike]: `%${req.query.title}%` } }]
      },
      include: fullTicket
    })
      .then(tickets => {
        res.send(tickets);
      })
      .catch(err => res.status(404).send(err));
  } else {
    Ticket.findAll({
      order: [["updatedAt", "DESC"]],
      where: {
        statusId: 3
      },
      include: fullTicket
    })
      .then(tickets => res.send(tickets))
      .catch(err => res.status(404).send(err));
  }
};

module.exports = {
  removeTag,
  addTag,
  fetchTickets,
  fetchStatus,
  createTicket,
  editTicket,
  editComment,
  deleteTicket,
  addParticipant,
  removeParticipant,
  userTickets,
  fetchTicket,
  createImage,
  getDevpedia
};
