const dummy = (blogs) => {
    return 1
  }

  
const totalLikes = (blogs) => {
    var yhteensa = 0
    blogs.forEach(element => {
        yhteensa += element.likes
    });

    return yhteensa
  }

const favoriteBlog = (blogs) => {
    var suosikki = {}
    blogs.forEach(blogi => {
        if( suosikki.likes === undefined || blogi.likes > suosikki.likes) {
            suosikki = blogi
        } 
    })
    return suosikki
}

const mostBlogs = (blogs) => {
    const tilasto = new Map()
    var paras = {}

    blogs.forEach(blogi => {
        var blogeja = tilasto.get( blogi.author)
        if( blogeja === undefined) {
            blogeja = 1
        } else {
            blogeja++
        }

        tilasto.set(blogi.author, blogeja)

        if( paras.blogs === undefined || blogeja > paras.blogs) {
            paras = {
                author: blogi.author,
                blogs: blogeja
            }
        }        

    })
    return paras
}


const mostLikes = (blogs) => {
    const tilasto = new Map()
    var paras = {}

    blogs.forEach(blogi => {
        var peukkuja = tilasto.get( blogi.author)
        if( peukkuja === undefined) {
            peukkuja = blogi.likes
        } else {
            peukkuja = peukkuja + blogi.likes
        }

        tilasto.set(blogi.author, peukkuja)

        if( paras.likes === undefined || peukkuja > paras.likes) {
            paras = {
                author: blogi.author,
                likes: peukkuja                
            }
        }        

    })
    return paras
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
} 
