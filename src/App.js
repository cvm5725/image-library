import React, { useState, useRef, useCallback } from 'react'
import useLoadImages from './useLoadImages'
import {
  Row,
  Col,
  Container
} from "reactstrap"

export default function App() {
  const [limit, setLimit] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)

  const {
    images,
    loading,
    error
  } = useLoadImages(limit, pageNumber)

  const observer = useRef()
  const lastimageElementRef = useCallback(node => {
    console.log("node",node)
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting ) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])

  window.onscroll = function(){
    if(
      window.innerHeight + document.documentElement.scrollTop 
      === document.documentElement.offsetHeight
    ){
      setPageNumber(prevPageNumber => prevPageNumber + 1)
    }
  }

  return (
    <Container>
        <Row className="row">
          {images.map((image, index) => {
            if (images.length === index + 1) {
      
              return(
                <Col className="column" ref={lastimageElementRef}  xs="12" sm="6" md="4"  key={image.id}>
                  <img src={image.download_url}  className="img-fluid" alt={image.author} />
                </Col>
                
              )
            } else {
              return( 
                <Col className="column" ref={lastimageElementRef} xs="12" sm="6" md="4" key={image.id}>
                  <img src={image.download_url}  className="img-fluid" alt={image.author} />
                </Col>
              )
            }
          })}
          <div>{loading && 'Loading...'}</div>
          <div>{error && 'Error'}</div>
        </Row>
    </Container>
  )
}
