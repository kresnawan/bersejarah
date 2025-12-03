package utility

func ParseAddress(jln, dsn, kel, kec, kab string) string {
	var str string = ""
	var compArr []string = []string{jln, dsn, kel, kec, kab}

	for i := 0; i < len(compArr); i++ {
		if compArr[i] != "" {
			str = str + compArr[i]
		}

		if i != len(compArr)-1 {
			str = str + ", "
		}
	}

	return str
}
