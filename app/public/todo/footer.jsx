import '../assets/styles/footer.styl';
export default {
    data() {
        return {
            authur: 'enj'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>Written By {this.authur}</span>
            </div>
        )
    }
}