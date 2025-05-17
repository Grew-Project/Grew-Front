import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import HappinessFace from '../assets/faces/happiness-face.svg'
import AngerFace from '../assets/faces/anger-face.svg'
import ConfusionFace from '../assets/faces/confusion-face.svg'
import LoveFace from '../assets/faces/love-face.svg'
import SadnessFace from '../assets/faces/sadness-face.svg'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const EmotionPieChart = ({ emotion_counts }) => {
  const values = [
    emotion_counts.Happiness,
    emotion_counts.Anger,
    emotion_counts.Love,
    emotion_counts.Sadness,
    emotion_counts.Confusion,
  ]

  const faceImages = [HappinessFace, AngerFace, LoveFace, SadnessFace, ConfusionFace]

  // 이미지 요소 미리 생성
  const imageElements = faceImages.map(src => {
    const img = new Image()
    img.src = src
    return img
  })

  const data = {
    labels: ['행복', '화남', '사랑', '슬픔', '당황'],
    datasets: [
      {
        data: values,
        backgroundColor: ['#FFCECE', '#FFD6A5', '#B5EAD7', '#C7CEEA', '#FFF5BA'],
        borderWidth: 0,
      },
    ],
  }

  const customImagePlugin = {
    id: 'customImagePlugin',
    afterDatasetDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart
      const dataset = chart.getDatasetMeta(0)

      dataset.data.forEach((element, index) => {
        if (values[index] === 0) return
        const { x, y } = element.tooltipPosition()
        const img = imageElements[index]
        const size = 24
        if (img.complete) {
          ctx.drawImage(img, x - size / 2, y - size / 2, size, size)
        } else {
          img.onload = () => {
            chart.draw()
          }
        }
      })
    },
  }

  const options = {
    hover: {
      mode: null, // hover 효과 없애기
    },
    plugins: {
      legend: {
        display: false, // ✅ 범례 숨기기
      },
      tooltip: { enabled: false },
      datalabels: {
        display: false, // 텍스트 숨김
      },
      customImagePlugin: {}, // 플러그인 활성화
    },
  }

  return <Pie data={data} options={options} plugins={[customImagePlugin]} />
}

export default EmotionPieChart
