import _ from 'lodash'
import { BsDatabaseAdd } from 'react-icons/bs'
import Lightbox from "react-awesome-lightbox";
import { useState } from 'react';

const Question = (props) => {
    const {data, index} = props
    const [isPreviewImage, setIsPreviewImage] = useState(false)

    if(_.isEmpty(data)){
        return (
            <>
            </>
        )
    }

    const handleCheckBox = (event, aId, qId) =>{
        // console.log("check", event.target.checked)
        console.log("check data", aId, qId)
        props.handleCheckBox(aId, qId)
    }
    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img 
                        style={{cursor:'pointer'}}
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64, ${data.image}`} 
                    />
                    {isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/jpeg;base64, ${data.image}`}    //    convert tu kieu file sang kieu blod 
                            title={"Question Image"}
                            onClose={() => setIsPreviewImage(false)}>
                        </Lightbox>
                    }
                </div>
                :
                <div className='q-image'>

                </div>
            }
            <div className="question">Question {index + 1}: {data.questionDescription} ?</div>
            <div className="answer">
                {data.answers && data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" 
                                        checked={a.isSelected} //kiem tra rang nguoi dung co chon checkbox khong
                                        onChange={(event) => handleCheckBox(event, a.id, data.questionId)} //a: answer.id : cac chi so id cua cac phan tu trong data,question.questionId: chi so cua data 
                                    id="flexCheckChecked" />
                                        <label className="form-check-label" for="flexCheckChecked">
                                            {a.description}
                                        </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question