package routes

import (

	// "fmt"
	// "log"
	// "net/http"

	// "app/internal/middleware"

	"app/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RouterInit() {
	// gin.SetMode(gin.ReleaseMode)

	Router := gin.Default()

	Router.Use(middleware.CORSMiddleware())
	Router.SetTrustedProxies([]string{"127.0.0.1"})

	v1AuthRouter := Router.Group("/api/v1")
	{
		AuthRoutes(v1AuthRouter)
	}

	v1Router := Router.Group("/api/v1")
	// v1Router.Use(middleware.NeedAuth())
	{
		UsersRoutes(v1Router)
		TestRoutes(v1Router)
		DataTempatRoutes(v1Router)
		UploadsRoute(v1Router)
	}

	Router.Run()
}
