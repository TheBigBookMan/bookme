package dev.smerd.bookme;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    // template is a more specific query to the database that requires more complex logic
    @Autowired
    private MongoTemplate mongoTemplate;
    public Comment createComment(String commentBody, String bookId) {
        //   this is creating a new comment by using the reviewRepository mongo function of insert
        Comment comment = commentRepository.insert(new Comment(commentBody));

//        this is updating the book with the new comment id
        mongoTemplate.update(Book.class)
                .matching(Criteria.where("bookId").is(bookId))
                .apply(new Update().push("commentIds").value(comment))
                .first();
        return comment;
    }

    public void upvote(UUID commentId) {
//        update the comment by adding one onto the upvotes tally
        mongoTemplate.update(Comment.class)
                .matching(Criteria.where("commentId").is(commentId))
                .apply(new Update().inc("upvotes", 1))
                .first();
    }

    public void downvote(UUID commentId) {
        mongoTemplate.update(Comment.class)
                .matching(Criteria.where("commentId").is(commentId))
                .apply(new Update().inc("downvotes", 1))
                .first();
    }

//    using the regular mongoRepository dependency injection for simple delete operation
    public void deleteComment(UUID commentId) {
        Query query = new Query(Criteria.where("commentId").is(commentId));
        mongoTemplate.remove(query, Comment.class);
    }
}
