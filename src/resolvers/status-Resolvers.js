const { Ticket, Comment, User, Tag } = require("../db/models");
const { fullTicket } = require("./index");

const STATUS = {
  OPEN: 1,
  PROCESS: 2,
  CLOSED: 3,
  REJECTED: 4
};

const setStatus = function(req, res, next) {
  Ticket.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(ticket => {
      switch (req.body.status) {
        case STATUS.PROCESS:
          return Comment.findOne({
            where: {
              ticketId: req.params.id
            }
          }).then(comment => {
            if (comment) {
              return comment
                .update({
                  description: null
                })
                .then(() => ticket.setStatus(STATUS.PROCESS))
                .then(()=> ticket.update({location:req.body.description}))
                .then(() =>
                  Ticket.findOne({
                    where: { id: req.params.id },
                    include: fullTicket
                  })
                )
                .then(ticketUpdated => res.send(ticketUpdated));
            } else {
              ticket
                .createComment({})
                .then(comment => comment.setReplier(req.user.id))
                .then(()=> ticket.update({location:req.body.description}))
                .then(() => ticket.setStatus(STATUS.PROCESS))
                .then(() =>
                  Ticket.findOne({
                    where: { id: req.params.id },
                    include: fullTicket
                  })
                )
                .then(ticketUpdated => res.send(ticketUpdated));
            }
          });

        case STATUS.CLOSED:
          return Comment.findOne({
            where: {
              ticketId: req.params.id
            }
          }).then(comment => {
            if (comment) {
              return comment
                .update({
                  description: req.body.description
                })
                .then(() => comment.setReplier(req.user.id))
                .then(() => ticket.setStatus(STATUS.CLOSED))
                .then(() =>
                  Ticket.findOne({
                    where: { id: req.params.id },
                    include: fullTicket
                  })
                )
                .then(ticketUpdated => res.send(ticketUpdated));
            } else {
              return ticket

                .createComment({
                  description: req.body.description
                })
                .then(comment => comment.setReplier(req.user.id))
                .then(() => ticket.setStatus(STATUS.CLOSED))
                .then(() =>
                  Ticket.findOne({
                    where: { id: req.params.id },
                    include: fullTicket
                  })
                )
                .then(ticketUpdated => res.send(ticketUpdated));
            }
          });

        case STATUS.REJECTED:
          return Comment.findOne({
            where: {
              ticketId: req.params.id
            }
          }).then(comment => {
            if (req.body.description) {
              if (comment) {
                return comment
                  .update({
                    description: req.body.description
                  })
                  .then(() => comment.setReplier(req.user.id))

                  .then(() => ticket.setStatus(STATUS.REJECTED))
                  .then(() =>
                    Ticket.findOne({
                      where: { id: req.params.id },
                      include: fullTicket
                    })
                  )
                  .then(ticketUpdated => res.send(ticketUpdated));
              } else {
                return ticket
                  .createComment({
                    description: req.body.description
                  })
                  .then(comment => comment.setReplier(req.user.id))
                  .then(() => ticket.setStatus(STATUS.REJECTED))
                  .then(() =>
                    Ticket.findOne({
                      where: { id: req.params.id },
                      include: fullTicket
                    })
                  )
                  .then(ticketUpdated => res.send(ticketUpdated));
              }
            } else {
              res.status(403).send("Ingresar motivo");
            }
          });

        case STATUS.OPEN:
          return Comment.findOne({
            where: {
              ticketId: req.params.id
            }
          })
            .then(comment => {
              if (comment) {
                return comment
                  .update({
                    description: req.body.description
                  })
                  .then(() => comment.setReplier(req.user.id))

                  .then(() => ticket.setStatus(STATUS.OPEN))
                  .then(() =>
                    Ticket.findOne({
                      where: { id: req.params.id },
                      include: fullTicket
                    })
                  )
                  .then(ticketUpdated => res.send(ticketUpdated));
              }
            })
            .then(() => ticket.setStatus(STATUS.OPEN))
            .then(() =>
              Ticket.findOne({
                where: { id: req.params.id },
                include: fullTicket
              })
            )
            .then(ticketUpdated => res.send(ticketUpdated));
      }
    })
    .catch(err => console.log(err));
};

module.exports = {
  setStatus
};
