import { Button } from '../common'

const Dashboard = ({ startTest }) => {
  return (
    <div className="testing-dashboard">
      <div className="testing-dashboard-item">
        <div className="testing-dashboard-item__title">Speed level</div>
        <div className="illustration-card right">
          <img
            src="/testing-illustration_1.png"
            alt=""
            className="illustration-card__illustration"
          />
          <div className="illustration-card-content">
            <div className="illustration-card-content__title">2.34</div>
            <div className="illustration-card-content__subtitle">
              Speed level
            </div>
          </div>
        </div>
      </div>

      <div className="testing-dashboard-item">
        <div className="testing-dashboard-item__title">Comprehension Level</div>
        <div className="illustration-card left">
          <img
            src="/testing-illustration_2.png"
            alt=""
            className="illustration-card__illustration"
          />
          <div className="illustration-card-content">
            <div className="illustration-card-content__title">10</div>
            <div className="illustration-card-content__subtitle">
              Comprehension Level
            </div>
          </div>
        </div>
      </div>

      <div className="testing-dashboard-item test-table">
        <div className="testing-dashboard-item__title">Tests</div>
        <table className="test-table">
          <tbody>
            <tr>
              <th></th>
              <th>Tests</th>
              <th>Description</th>
              <th>Button start</th>
            </tr>
            <tr>
              <td>
                <img src="/test-blue-icon.png" alt="" />
              </td>
              <td>Scroll Test</td>
              <td>brief description of the scroll test</td>
              <td>
                <Button variant="primary" onClick={startTest}>
                  Start
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/test-green-icon.png" alt="" />
              </td>
              <td>Another test</td>
              <td>brief description of the scroll test</td>
              <td>
                <Button variant="primary" onClick={startTest}>
                  Start
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/test-green-icon.png" alt="" />
              </td>
              <td>Another test</td>
              <td>brief description of the scroll test</td>
              <td>
                <Button variant="primary" onClick={startTest}>
                  Start
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/test-green-icon.png" alt="" />
              </td>
              <td>Another test</td>
              <td>brief description of the scroll test</td>
              <td>
                <Button variant="primary" onClick={startTest}>
                  Start
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/test-green-icon.png" alt="" />
              </td>
              <td>Another test</td>
              <td>brief description of the scroll test</td>
              <td>
                <Button variant="primary" onClick={startTest}>
                  Start
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
