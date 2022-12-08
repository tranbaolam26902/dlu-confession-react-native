import { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, Text, StatusBar, RefreshControl } from 'react-native';
import GlobalStyles from '../assets/styles/GlobalStyles';

import { useStore } from '../store';
import HeaderBar from '../components/header';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

function HomeScreen() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [refreshing, setRefreshing] = useState(false);

    // Functions
    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        let time = new Date();
        // Call API
        // fetch(`${apiURL}/token`, {
        //     method: 'POST',
        //     body: `grant_type=password&username=Admin&password=Admin#123`,
        // })
        //     .then((response) => response.json())
        //     .then((response) => {
        //         let time = new Date() - time;        // set time for refreshing
        //         if (response.access_token) {
        //             console.log(time);
        //         }
        //     });
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <>
            <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
            <ScrollView
                style={styles.wrapper}
                decelerationRate={'normal'}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={true}
                refreshControl={
                    <RefreshControl progressViewOffset={64} refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <HeaderBar />
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam autem quibusdam ipsam, nihil
                    expedita veniam earum quasi commodi minus laudantium deserunt recusandae suscipit magnam numquam
                    repellat harum quo soluta, porro eveniet aliquam nostrum praesentium deleniti. Suscipit nesciunt
                    veritatis rem magni fuga ab labore, aperiam voluptatibus, expedita architecto maiores saepe
                    blanditiis? Non fugiat corporis ad minima quidem exercitationem pariatur quae explicabo assumenda
                    quasi, temporibus odit delectus hic quis animi ab est voluptatibus laboriosam quam alias ipsum
                    expedita. Exercitationem esse maxime a dolor nostrum dolorem hic non incidunt doloremque, delectus
                    enim velit sapiente, officiis, obcaecati sunt eligendi nobis corrupti ad deserunt autem cum! Velit
                    aperiam vero optio commodi non iure est consequatur ab! Veniam, sapiente a praesentium sit placeat
                    soluta iusto culpa possimus molestias, quae perferendis enim rem aliquam nemo dolorum fugit expedita
                    veniam earum quasi commodi minus laudantium deserunt recusandae suscipit magnam numquam repellat
                    harum quo soluta, porro eveniet aliquam nostrum praesentium deleniti. Suscipit nesciunt veritatis
                    rem magni fuga ab labore, aperiam voluptatibus, expedita architecto maiores saepe blanditiis? Non
                    fugiat corporis ad minima quidem exercitationem pariatur quae explicabo assumenda quasi, temporibus
                    odit delectus hic quis animi ab est voluptatibus laboriosam quam alias ipsum expedita.
                    Exercitationem esse maxime a dolor nostrum dolorem hic non incidunt doloremque, delectus enim velit
                    sapiente, officiis, obcaecati sunt eligendi nobis corrupti ad deserunt autem cum! Velit aperiam vero
                    optio commodi non iure est consequatur ab! Veniam, sapiente a praesentium sit placeat soluta iusto
                    culpa possimus molestias, quae perferendis enim rem aliquam nemo dolorum fugit expedita veniam earum
                    quasi commodi minus laudantium deserunt recusandae suscipit magnam numquam repellat harum quo
                    soluta, porro eveniet aliquam nostrum praesentium deleniti. Suscipit nesciunt veritatis rem magni
                    fuga ab labore, aperiam voluptatibus, expedita architecto maiores saepe blanditiis? Non fugiat
                    corporis ad minima quidem exercitationem pariatur quae explicabo assumenda quasi, temporibus odit
                    delectus hic quis animi ab est voluptatibus laboriosam quam alias ipsum expedita. Exercitationem
                    esse maxime a dolor nostrum dolorem hic non incidunt doloremque, delectus enim velit sapiente,
                    officiis, obcaecati sunt eligendi nobis corrupti ad deserunt autem cum! Velit aperiam vero optio
                    commodi non iure est consequatur ab! Veniam, sapiente a praesentium sit placeat soluta iusto culpa
                    possimus molestias, quae perferendis enim rem aliquam nemo dolorum fugit expedita veniam earum quasi
                    commodi minus laudantium deserunt recusandae suscipit magnam numquam repellat harum quo soluta,
                    porro eveniet aliquam nostrum praesentium deleniti. Suscipit nesciunt veritatis rem magni fuga ab
                    labore, aperiam voluptatibus, expedita architecto maiores saepe blanditiis? Non fugiat corporis ad
                    minima quidem exercitationem pariatur quae explicabo assumenda quasi, temporibus odit delectus hic
                    quis animi ab est voluptatibus laboriosam quam alias ipsum expedita. Exercitationem esse maxime a
                    dolor nostrum dolorem hic non incidunt doloremque, delectus enim velit sapiente, officiis, obcaecati
                    sunt eligendi nobis corrupti ad deserunt autem cum! Velit aperiam vero optio commodi non iure est
                    consequatur ab! Veniam, sapiente a praesentium sit placeat soluta iusto culpa possimus molestias,
                    quae perferendis enim rem aliquam nemo dolorum fugit expedita veniam earum quasi commodi minus
                    laudantium deserunt recusandae suscipit magnam numquam repellat harum quo soluta, porro eveniet
                    aliquam nostrum praesentium deleniti. Suscipit nesciunt veritatis rem magni fuga ab labore, aperiam
                    voluptatibus, expedita architecto maiores saepe blanditiis? Non fugiat corporis ad minima quidem
                    exercitationem pariatur quae explicabo assumenda quasi, temporibus odit delectus hic quis animi ab
                    est voluptatibus laboriosam quam alias ipsum expedita. Exercitationem esse maxime a dolor nostrum
                    dolorem hic non incidunt doloremque, delectus enim velit sapiente, officiis, obcaecati sunt eligendi
                    nobis corrupti ad deserunt autem cum! Velit aperiam vero optio commodi non iure est consequatur ab!
                    Veniam, sapiente a praesentium sit placeat soluta iusto culpa possimus molestias, quae perferendis
                    enim rem aliquam nemo dolorum fugit expedita veniam earum quasi commodi minus laudantium deserunt
                    recusandae suscipit magnam numquam repellat harum quo soluta, porro eveniet aliquam nostrum
                    praesentium deleniti. Suscipit nesciunt veritatis rem magni fuga ab labore, aperiam voluptatibus,
                    expedita architecto maiores saepe blanditiis? Non fugiat corporis ad minima quidem exercitationem
                    pariatur quae explicabo assumenda quasi, temporibus odit delectus hic quis animi ab est voluptatibus
                    laboriosam quam alias ipsum expedita. Exercitationem esse maxime a dolor nostrum dolorem hic non
                    incidunt doloremque, delectus enim velit sapiente, officiis, obcaecati sunt eligendi nobis corrupti
                    ad deserunt autem cum! Velit aperiam vero optio commodi non iure est consequatur ab! Veniam,
                    sapiente a praesentium sit placeat soluta iusto culpa possimus molestias, quae perferendis enim rem
                    aliquam nemo dolorum fugit expedita veniam earum quasi commodi minus laudantium deserunt recusandae
                    suscipit magnam numquam repellat harum quo soluta, porro eveniet aliquam nostrum praesentium
                    deleniti. Suscipit nesciunt veritatis rem magni fuga ab labore, aperiam voluptatibus, expedita
                    architecto maiores saepe blanditiis? Non fugiat corporis ad minima quidem exercitationem pariatur
                    quae explicabo assumenda quasi, temporibus odit delectus hic quis animi ab est voluptatibus
                    laboriosam quam alias ipsum expedita. Exercitationem esse maxime a dolor nostrum dolorem hic non
                    incidunt doloremque, delectus enim velit sapiente, officiis, obcaecati sunt eligendi nobis corrupti
                    ad deserunt autem cum! Velit aperiam vero optio commodi non iure est consequatur ab! Veniam,
                    sapiente a praesentium sit placeat soluta iusto culpa possimus molestias, quae perferendis enim rem
                    aliquam nemo dolorum fugit expedita veniam earum quasi commodi minus laudantium deserunt recusandae
                    suscipit magnam numquam repellat harum quo soluta, porro eveniet aliquam nostrum praesentium
                    deleniti. Suscipit nesciunt veritatis rem magni fuga ab labore, aperiam voluptatibus, expedita
                    architecto maiores saepe blanditiis? Non fugiat corporis ad minima quidem exercitationem pariatur
                    quae explicabo assumenda quasi, temporibus odit delectus hic quis animi ab est voluptatibus
                    laboriosam quam alias ipsum expedita. Exercitationem esse maxime a dolor nostrum dolorem hic non
                    incidunt doloremque, delectus enim velit sapiente, officiis, obcaecati sunt eligendi nobis corrupti
                    ad deserunt autem cum! Velit aperiam vero optio commodi non iure est consequatur ab! Veniam,
                    sapiente a praesentium sit placeat soluta iusto culpa possimus molestias, quae perferendis enim rem
                    aliquam nemo dolorum fugit consequuntur vel velit repellendus minima rerum eveniet architecto sequi.
                    Nisi vitae, ut illum qui iste repellendus veritatis animi optio laudantium repellat perferendis
                    debitis esse dolorem suscipit, cumque, ducimus quibusdam ea quod nemo inventore ipsum commodi dolore
                    fugiat? Ab vero fugit consectetur debitis perferendis odit quibusdam optio id. Est rem quas minima
                    id laudantium. Dignissimos non labore aut adipisci id maxime, omnis ad fugiat architecto enim,
                    doloremque eum beatae ipsam itaque, earum eveniet autem soluta. Consequuntur provident et fugit,
                    deleniti tempore fugiat! Unde, odit saepe aspernatur maxime deserunt alias officiis optio
                    praesentium fugiat magnam ex inventore esse exercitationem, commodi quo dolor dolore impedit cum
                    nulla! Quod suscipit aperiam fuga deleniti quaerat consequatur praesentium dolor in minima?
                    Exercitationem quasi illum non facere in quis quidem iure ab, voluptatum pariatur consequatur
                    dolores aliquid rem maiores excepturi asperiores tempora repellendus illo soluta nobis voluptatibus!
                    Maiores quas et, necessitatibus consectetur sint veritatis quis natus harum. Eligendi, distinctio
                    totam porro magni id molestiae eaque explicabo doloremque, quod obcaecati delectus, voluptates
                    incidunt! Praesentium repellat molestias doloribus, commodi quae porro dolore recusandae nulla
                    voluptates. Cum adipisci at ipsum voluptates alias enim culpa rem ad laborum placeat obcaecati neque
                    voluptas eum molestiae, optio qui quo soluta accusamus nulla. Deserunt enim dolores error rerum
                    laboriosam vitae, vel quia velit voluptatibus voluptatem, voluptates qui magni, iure quod aliquid et
                    placeat sint perferendis! Reprehenderit earum quod facilis ea nemo praesentium expedita recusandae
                    omnis esse fugiat delectus, eum, deserunt magni architecto, perspiciatis impedit. Non tempore cum,
                    unde voluptates, deleniti eos, voluptatem consequatur dolorum eveniet impedit aspernatur mollitia ad
                    consequuntur voluptas natus iusto laudantium. Impedit quaerat tempore enim asperiores blanditiis vel
                    quisquam maiores nisi nulla quam ad deserunt perspiciatis, repellat similique placeat iure
                    doloremque facere? Totam, maiores atque illo modi quod facere ab cum dolores id, velit officia?
                    Quod, ratione. Voluptas labore aliquid dolorum fugit accusamus nulla amet porro exercitationem
                    consequuntur ea neque perferendis quaerat reiciendis deserunt dolorem modi iure atque minima,
                    tempore, facilis aliquam harum sapiente blanditiis. Quia harum totam eveniet quae unde repudiandae
                    dolor, sed sit? Quas iste illo cumque hic esse aliquam ea! Quasi expedita facilis itaque, repellat
                    aliquam, beatae consectetur soluta enim fugit iure, esse quam minima veniam? Expedita, optio id in
                    velit a quidem vero nobis ea vitae tempora? Labore debitis error voluptas dolore minus? Aut maiores
                    nobis tenetur unde quae a, numquam recusandae soluta illo doloribus rem tempora eaque deserunt vel.
                    Illo nobis quas dolorem necessitatibus, explicabo a id nisi voluptatum soluta, minus, exercitationem
                    ad accusamus deserunt at quis. Quod, fugiat excepturi aliquid, ad voluptatum neque ea incidunt esse,
                    unde consectetur quaerat! Est voluptas nobis praesentium vitae omnis alias possimus ducimus aperiam
                    consequuntur ad molestiae, ipsa in saepe suscipit explicabo similique fugiat numquam labore
                    inventore consectetur asperiores. Odit doloremque quas molestiae architecto et, nesciunt sit
                    repellat placeat exercitationem dignissimos pariatur? Qui, impedit quod. Asperiores temporibus
                    aliquid, quas aspernatur dolores ab dicta non ut fuga nemo facilis natus quia suscipit at? Dolor
                    nisi, dolorum nemo incidunt magnam labore velit voluptatum odio tempore numquam deleniti ipsum
                    mollitia quidem accusamus? Ad incidunt, a inventore placeat eaque consectetur nulla hic nisi ipsum
                    illo deserunt autem ut reprehenderit quis earum perferendis blanditiis? Doloremque nisi autem sed
                    quo voluptas quae molestias eveniet necessitatibus, dicta dolores temporibus praesentium aspernatur
                    iusto earum, accusamus qui ducimus dolorem harum totam, possimus illo deserunt laboriosam voluptate
                    beatae? Placeat doloribus voluptatem omnis harum ea! A velit dolorem illum, fuga optio laborum,
                    obcaecati quas cupiditate incidunt magni recusandae quis iste, possimus nulla assumenda dolore
                    delectus odit rem pariatur tempore aperiam? Sint maiores temporibus qui expedita, praesentium unde
                    enim id ex harum quidem voluptates obcaecati eos modi non suscipit perspiciatis quae illo at fuga
                    quos ea numquam reiciendis, ipsum amet! Culpa laborum veniam, similique laudantium ipsa perferendis
                    eveniet ad repellendus quis minima autem tenetur, sunt soluta eum vitae dicta expedita! Temporibus
                    molestias nemo provident, excepturi quidem ipsam delectus deserunt? Explicabo soluta nulla iste
                    blanditiis, maxime saepe, quo adipisci ducimus quisquam vel beatae nesciunt sint quaerat quam
                    veritatis eveniet nostrum distinctio culpa voluptatum temporibus quidem ratione tenetur fuga! Culpa,
                    distinctio minus optio vitae ut porro dolorem error assumenda ea, non ratione sequi a alias labore
                    hic quas aperiam praesentium quidem? A culpa doloremque quod ex eaque consequuntur illum voluptate,
                    fugiat dolore voluptatum quam, dolorum inventore harum doloribus. Dolore ab illum ducimus id
                    perferendis rerum quisquam quia perspiciatis modi. Neque eveniet enim sequi aspernatur, at ipsam,
                    accusamus non quos fugit provident rem ut, eius dolores ad molestiae. Tempora voluptatem corporis
                    unde perspiciatis officiis, ducimus vitae ea fugit distinctio, itaque eveniet magnam veritatis ipsam
                    voluptatum voluptate qui, cum consequatur rem? Aliquam voluptas voluptatum explicabo fugiat corrupti
                    harum nesciunt asperiores consectetur blanditiis eos cumque et enim necessitatibus ipsa, dolore eius
                    totam quod expedita modi cum delectus placeat culpa deleniti error. Maxime consequatur, quidem,
                    molestiae excepturi at vero ex dolorum sunt eum id ratione itaque eaque doloribus cupiditate enim
                    aspernatur suscipit ducimus quas totam! Ducimus assumenda exercitationem hic eveniet dolore vero
                    recusandae libero excepturi, et tempore magnam quaerat expedita corrupti? Odio, dolore omnis harum
                    voluptas perferendis rem deserunt accusantium cumque, voluptatem, recusandae neque nobis. Pariatur
                    cupiditate quo, placeat, eos soluta amet rem hic dolore ab minus dolores corrupti beatae harum
                    suscipit sed voluptate repellendus earum illo, provident reiciendis obcaecati vel deleniti!
                    Temporibus labore facilis error! Optio, nam.
                </Text>
            </ScrollView>
        </>
    );
}

export default HomeScreen;
