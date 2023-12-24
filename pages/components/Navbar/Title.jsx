import React from 'react'

function Title({children,searchClasname}) {
  return (
    <div className={`${searchClasname} font-dancingScript`}>{children}</div>
  )
}

export default Title


//kullandığım yazılarda hepsinde aynı font olmasını istedğim için hepsine tek tek css yazmak istemediğim için component oluşturdum
//childrenda burda yazdığım yazıları tutar props mantığı
//searchClasname burda ise componenti kullandığım yerlerde css yazabilmek için props aldım ve clasName verdim.Bu propsa verdiğim değrler burdaki className gelir.