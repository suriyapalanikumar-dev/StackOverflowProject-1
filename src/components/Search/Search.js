import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './Search.css'
import { Link, useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setPosts([{
            type: 'question',
            votes: 5,
            answers: 3,
            title: 'Question title',
            description: 'Description of the problem',
            answered: false,
            tags: ['java', 'python', 'javascript', 'react', 'node'],
            user: 'Phillip Nguyen',
            date: new Date(2022, 0, 6)
        },
        {
            type: 'question',
            votes: 7,
            answers: 3,
            title: 'Question title',
            description: 'Here is a piece of C++ code that shows some very peculiar behavior. For some strange reason, sorting the data (before the timed region) miraculously makes the loop almost six times faster. #include <a',
            answered: true,
            tags: ['java', 'python', 'javascript'],
            user: 'Phillip Nguyen',
            date: new Date(2022, 3, 12)
        },
        {
            type: 'answer',
            votes: 2,
            title: 'Answer title',
            description: 'Description of answer',
            answered: false,
            tags: ['jave', 'python', 'javascript'],
            user: 'Phillip Nguyen',
            date: new Date(2022, 3, 27)
        },
        {
            type: 'answer',
            votes: 6,
            title: 'Answer title',
            description: 'Description of answer',
            answered: true,
            tags: ['jave', 'python', 'javascript'],
            user: 'Phillip Nguyen',
            date: new Date(2022, 1, 3)
        },
        ])
    }, [])

    const handleNewest = () => {
        setPosts([].concat(posts).sort((a, b) => b.date.getTime() - a.date.getTime()))
    }

    const handleRelevance = () => {
        setPosts([].concat(posts).sort((a, b) => b.votes - a.votes))
    }

    return (
        <div className='search-container'>
            <Container className='mt-3 search-head-container'>
                <div>
                    <h3 className='search-results-title'>Search results</h3>
                    <Button className='ask-question-button' onClick={() => navigate('/postquestion')}>Ask question</Button>
                </div>
            </Container>
            <Container className='mt-3'>
                <div>
                    <p className='num-results mt-2'>{posts.length} results</p>
                    <ButtonGroup style={{ marginLeft: '52%' }}>
                        <Button variant='outline-secondary' onClick={handleRelevance}>Relevance</Button>
                        <Button variant='outline-secondary' onClick={handleNewest}>Newest</Button>
                    </ButtonGroup>
                </div>
            </Container>
            <hr className='search-hr' />
            {posts.map(post => (
                <div>
                    <Container>
                        <Row>
                            {post.type === 'question' ?
                                <Col md={2} className='text-center' style={{ width: '80px' }}>
                                    <strong className='vote-number'>{post.votes}</strong>
                                    <p className='vote-text'>votes</p>
                                    <div className={post.answered ? 'answered' : null}>
                                        <strong className={post.answered ? 'answer-number' : 'unanswered-number'}>{post.answers}</strong>
                                        <p className={post.answered ? 'answer-text' : 'unanswered-text'}>answers</p>
                                    </div>
                                </Col> :
                                <Col md={2} className='text-center' style={{ width: '80px'}}>
                                    <strong className='vote-number' style={{color: post.answered ? '#47A868' : '#6A747C'}}>{post.votes}</strong>
                                    <p className='vote-text' style={{color: post.answered ? '#47A868' : '#6A747C'}}>votes</p>
                                </Col>}
                            <Col md={10} style={{ width: '700px' }}>
                                <Link to='/' className='search-question-title mb-2'>{post.type === 'question' ? 'Q' : 'A'}: {post.title}</Link>
                                <p className='search-question-desc mb-1'>{post.description}</p>
                                {post.tags.map(tag => (
                                    <div className='search-tag-block me-1'>{tag}</div>
                                ))}
                                <p className='search-author'>{post.type === 'question' ? 'Asked' : 'Answered'} {post.date.toLocaleDateString('en-us', { year: "numeric", day: 'numeric', month: "short" })} by <Link to='/users' className='search-name-link'>{post.user}</Link></p>
                            </Col>
                        </Row>
                    </Container>
                    <hr className='search-hr' />
                </div>
            ))}
        </div>
    )
}

export default Search