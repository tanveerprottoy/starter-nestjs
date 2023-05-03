export abstract class BaseRepository {

    async handleCursor(
        cursor: any
    ): Promise<any | null> {
        try {
            // Execute the each command, triggers for each document
            cursor.forEach((doc: any) => {
                if(doc == null) {
                    return;
                }
                console.log("cursor.forEach", doc);
            });
            // const stream = cursor.stream();
            // stream.on("data", function (doc) {
            //     console.log("stream.on", doc);
            // });
            // stream.on("error", function (err) {
            //     console.log(err);
            // });
            // stream.on("end", function () {
            //     console.log("All done!");
            // });
            return cursor.toArray();
        }
        catch(e) {
            console.log("bhalue");
            // console.error(e);
            // return null;
        }
    }
}