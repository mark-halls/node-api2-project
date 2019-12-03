const express = require(`express`);

const router = express.Router();

const db = require(`../data/db`);

router.use(express.json());

// Returns an array of all the post objects contained in the database.
router.get(`/`, (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

// Returns the post object with the specified id.
router.get(`/:id`, (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

// Returns an array of all the comment objects associated with the post
// with the specified id.
router.get(`/:id/comments`, (req, res) => {
  db.findPostComments(req.params.id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." })
    );
});

module.exports = router;
