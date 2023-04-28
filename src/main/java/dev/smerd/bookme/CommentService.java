package dev.smerd.bookme;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

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
                .matching(Criteria.where("id").is(bookId))
                .apply(new Update().push("commentIds").value(comment))
                .first();
        return comment;
    }
}
