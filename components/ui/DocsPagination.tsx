import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import RightArrowSvg from '../../public/svg/right-arrow.svg'
import { DynamicLink } from '../ui/DynamicLink'
import { fetchData } from 'utils/getNextTitle'
import next from 'next'

interface PaginationProps {
  prevPage?: string | null
  nextPage?: string | null
}

export function DocsPagination({ prevPage, nextPage }: PaginationProps) {
  // console.log(prevPage, nextPage)

  const [nextTitle, setNextTitle] = useState(null);
  // useEffect(() => {
  //   const getNextTitle = async () => {
  //     if (nextPage !== null)
  //     {
  //       const titleOfNextPage = await fetchData(nextPage);
  //       console.log('Title of Next Page is', titleOfNextPage);
  //       setNextTitle(titleOfNextPage)
  //     }
  //   }

  //   getNextTitle();
  // }, [nextPage]);

  return (
    <Wrapper>
      {prevPage && prevPage && (
        <DynamicLink href={`${prevPage}`} passHref>
          <PaginationLink previous>
            <span>Previous</span>
            <h5>{prevPage}</h5>
            <RightArrowSvg />
          </PaginationLink>
        </DynamicLink>
      )}
      {nextPage && nextPage && (
        <DynamicLink href={`${nextPage}`} passHref>
          <PaginationLink>
            <span>Next</span>
            <h5>{nextPage}</h5>
            <RightArrowSvg />
          </PaginationLink>
        </DynamicLink>
      )}
    </Wrapper>
  )
}

export default DocsPagination

/*
 ** Styles ------------------------------------------
 */

interface PaginationLinkProps {
  previous?: boolean
}

const PaginationLink = styled.a<PaginationLinkProps>`
  padding: 1rem;
  display: block;
  flex: 1 1 auto;
  font-family: var(--font-tuner);
  font-weight: regular;
  font-style: normal;
  text-decoration: none;
  background-color: #fafafa;
  color: var(--color-secondary);
  position: relative;
  text-align: right;
  padding-right: 3.5rem;
  margin: 0 1px 1px 0;

  span {
    font-size: 0.9375rem;
    text-transform: uppercase;
    opacity: 0.5;
  }

  h5 {
    font-size: 1.25rem;
    line-height: 1.3;
    margin: 0 !important;
    transition: all 180ms ease-out;
  }

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 2rem;
    height: auto;
    fill: var(--color-grey);
    transition: all 180ms ease-out;
  }

  &:hover {
    h5 {
      color: var(--color-orange);
    }
    svg {
      fill: var(--color-orange);
    }
  }

  ${props =>
    props.previous &&
    css`
      padding-right: 1rem;
      padding-left: 3.5rem;
      text-align: left;

      svg {
        right: auto;
        left: 0.75rem;
        transform: translate3d(0, -50%, 0) rotate(180deg);
      }
    `};
`

const Wrapper = styled.div`
  margin-top: 2rem;
  background-color: var(--color-light-dark);
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1px 0 0 1px;
`
