import { Result, Session } from "neo4j-driver"



class PostRepository {
    private session: Session
    constructor(sess: Session) {
        this.session = sess
    }

    getPosts(): Result {
        return this.session.run('MATCH (u:User)-[r:POSTING]->(p:Post) RETURN p.text AS text, u.username AS username, p.id AS id')
        //CREATE (p:Post {text:'Hello 123 BHHD',username: 'Hello World', id:1}) RETURN p
        //MATCH (a:Post {username: 'Hello World'}),(b:User {username: 'Poman'}) WITH a, b CREATE (b)-[r:POSTING]->(a)
        /**
         * CREATE (a:User {username:'wijaya', user_id:123}) RETURN a
         * MATCH (a:User {username: ‘andi’}),(b:User {username: ‘wijaya’}) WITH a, b CREATE (a)-[r:FOLLOW]->(b)
         * MATCH (a) RETURN a
         * CREATE (c:Comment {text:'Omg u again',username: 'Omg u again', id:1}) RETURN c
         * MATCH (a:Comment {username: 'Omg u again'}),(b:User {username: 'Toni'}) WITH a, b CREATE (b)-[c:POSTCOMMENT]->(a)
         * MATCH (a:Comment {username: 'Have a nice da'}),(b:Post {username: 'Good morning'}) WITH a, b CREATE (b)-[c:COMMENTING]->(a)
         */
    }

    getComments(post_id: Number): Result {
        return this.session.run('MATCH ({id: $post_id})<-[r:COMMENTING]-(c:Comment)<-[r2:POSTCOMMENT]-(u:User) RETURN c.text AS text, u.username AS username', 
            {
                post_id: post_id
                //MATCH ({id: $post_id})<-[r:COMMENT_TO]-(c:Comment)<-[r2:CREATE_COMMENT]-(u:User) RETURN c.text AS text, u.username AS username
            }
        )

    }
}



export {PostRepository}