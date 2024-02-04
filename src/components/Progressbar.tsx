export default function Progresssbar (props: { nowStep: string}) {
  const { nowStep } = props
  return (
    <div className='progressbar mx-auto'>
      <div className={`step step1 ${nowStep === 'step1' ? 'active' : ''}`}>
        <div className='bullet mx-auto d-flex justify-content-center align-items-center'>
          <span>
            {
              nowStep === 'step1' ? '1': (
                <i className='fas fa-check'></i>
              )
            }
          </span>
        </div>
        <p>輸入信箱及密碼</p>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="line"></div>
      </div>
      <div className={`step ${nowStep === 'step2' ? 'active' : ''}`}>
        <div className='bullet mx-auto d-flex justify-content-center align-items-center'>
          <span>2</span>
        </div>
        <p>填寫基本資料</p>
      </div>
    </div>
  )
}