import './Grade.scss'
import SvgIcons from '../SvgIcons/SvgIcons'

function Grade({ gradeValue, commentsValue }) {
    return (
        <div className={'Grade'}>
            <div className={'Grade__WrapperGrade'}>
                <button className={'Grade__Button'}>▲</button>
                <p className={'Grade__Value'}>{gradeValue || 0}</p>
                <button className={'Grade__Button Grade__ButtonDown'}>▲</button>
            </div>
            <button className={'Grade__Comments'}>
                <SvgIcons type={'comments'} />
                <p className={'Grade__CommentsValue'}>{commentsValue || 0}</p>
            </button>
        </div>
    )
}

export default Grade;