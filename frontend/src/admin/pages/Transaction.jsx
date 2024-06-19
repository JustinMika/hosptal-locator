import axios from 'axios'
import ContentAdmin from '../components/partials/ContentAdmin'

const Transaction = () => {
    axios.defaults.withCredentials = true
    localStorage.setItem('page', 'Transactions')
    return (
        <ContentAdmin>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, convallis a rutrum a, pretium ullamcorper magna. Sed
            elit sem, cursus sed ipsum a, maximus consequat orci. Suspendisse
            sit amet vestibulum dolor. Integer hendrerit congue quam, ac iaculis
            est. Vivamus consequat facilisis lectus. Pellentesque vitae nulla
            ligula. Sed id nulla ullamcorper, fringilla sapien vel, eleifend
            justo. Donec consequat metus eu neque vestibulum, ac congue nunc
            varius. Integer consequat sapien ut turpis egestas, pulvinar
            fermentum massa ornare. Donec porta malesuada leo, sit amet egestas
            odio pretium vitae. Ut accumsan nisi quis augue pretium, ut
            tincidunt dui volutpat. Integer posuere ut dolor quis gravida. Fusce
            a sagittis ex. Nam nec venenatis metus, vitae feugiat leo. Aliquam
            quis gravida elit. Sed neque dui, volutpat non pulvinar eu,
            sollicitudin vitae metus. Maecenas nec tortor at eros imperdiet
            imperdiet sodales ut ex. Aenean imperdiet bibendum egestas. Etiam
            condimentum velit ornare, vestibulum erat non, fringilla turpis.
            Praesent volutpat purus at dui posuere, eget condimentum enim
            pretium. Praesent dictum dui tincidunt libero venenatis, blandit
            mattis nisi blandit. Phasellus consectetur rutrum velit, nec iaculis
            enim mollis sit amet. Pellentesque eget suscipit dui. Ut feugiat
            sodales ex ut molestie. Nullam a purus tellus. Vivamus molestie,
            odio in eleifend commodo, ipsum mauris laoreet orci, ornare
            consectetur nulla arcu eget ante. Integer iaculis quis ante sed
            suscipit. Praesent maximus, tortor et posuere porta, ex elit
            hendrerit leo, ultrices imperdiet turpis arcu eget mi. Nullam
            vehicula pellentesque ante sit amet finibus. Vestibulum in augue sit
            amet sapien pellentesque interdum eu nec ante. Fusce sodales quam
            scelerisque, luctus ligula pellentesque, eleifend tellus. Proin
            pellentesque interdum augue, ac fringilla felis fermentum nec. Sed
            tortor felis, tempus ac felis ut, aliquet eleifend felis. Nulla nisl
            mi, posuere at placerat a, mollis id libero. Phasellus sed ex
            pharetra, aliquam quam sit amet, dictum orci. Vivamus mauris turpis,
            egestas a eros id, venenatis tincidunt turpis. Praesent lacinia urna
            id dolor porttitor, non rutrum massa hendrerit. Suspendisse
            consectetur lorem in ante imperdiet ornare. Sed maximus iaculis orci
            eu vehicula. Pellentesque fringilla ut ipsum ut cursus. Cras
            fermentum dolor eu nunc pretium, a suscipit ipsum euismod. Fusce
            malesuada orci a faucibus tristique. Praesent sit amet nibh nisl.
            Morbi tempus dictum iaculis. Nulla venenatis lorem at efficitur
            fringilla. Etiam ultrices tristique dui non vulputate. Nam dapibus
            hendrerit libero, ut vestibulum est iaculis a. Curabitur euismod mi
            at velit ultricies rutrum. Nullam sodales enim ac lectus fringilla,
            sit amet molestie mi commodo. Vivamus ut diam ac dui ultrices
            vehicula a eget justo. Vivamus diam tellus, scelerisque vel
            elementum in, maximus sed lorem. Phasellus ornare sodales
            sollicitudin. Phasellus quis facilisis erat. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Praesent in iaculis tortor. Proin in metus elementum, euismod urna
            eu, auctor ante. Nunc nibh libero, tempor eu aliquet sit amet,
            viverra et eros. Pellentesque luctus accumsan leo nec sollicitudin.
            Praesent egestas lacus in diam vulputate, ac volutpat augue
            pellentesque. Donec ac feugiat augue. Donec iaculis sit amet leo in
            congue. Sed tristique est augue, quis elementum dolor malesuada ac.
            Aenean sit amet ex vel nisi ultricies tincidunt. Fusce ut augue et
            leo sollicitudin faucibus ac a urna. Quisque mattis ex diam, quis
            aliquam ipsum rutrum vel. Suspendisse vulputate vehicula risus a
            accumsan. Fusce sed iaculis velit, sed iaculis ipsum. Integer
            venenatis augue sapien, at euismod elit cursus et. Proin elementum,
            ex vitae viverra ornare, eros urna placerat erat, non efficitur
            dolor felis molestie erat. Phasellus purus elit, feugiat nec
            interdum quis, consectetur at felis. Nunc laoreet
        </ContentAdmin>
    )
}

export default Transaction
