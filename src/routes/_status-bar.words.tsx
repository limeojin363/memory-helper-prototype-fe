import { createFileRoute, Link } from '@tanstack/react-router'
import SearchBar from '../components/layouts/mobile/SearchBar'
import useInput from '../hooks/useInput'
import WordSetList from '../components/word-sets/WordSetList'
import styled from '@emotion/styled'
import { Colors } from '../designs/colors'
import Icon from '../components/icons/Icon'

const WordsRouteComponent = () => {
  const [value, onChange] = useInput()

  return (
    <>
      <S.MiddleArea>
        <SearchBar value={value} onChange={onChange} />
        <WordSetList />
      </S.MiddleArea>
      <Link to="/words/new">
        <S.AddButton>
          <Icon iconName="plus" size={28} colorName="highlight-lightest" />
        </S.AddButton>
      </Link>
    </>
  )
}

export const Route = createFileRoute('/_status-bar/words')({
  component: WordsRouteComponent,
})

const S = {
  MiddleArea: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: calc(100% - 32px);
    margin: 20px 16px 0;
  `,
  AddButton: styled.div`
    all: unset;

    width: 60px;
    height: 60px;
    background-color: ${Colors['highlight-darkest']};
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    bottom: 128px;
    right: 48px;

    z-index: 100;
  `,
}
